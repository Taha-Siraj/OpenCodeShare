import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, X, RefreshCw, Download, FileIcon, Image as ImageIcon, FileText as FileTextIcon } from 'lucide-react';

export default function File() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const baseUrl = 'http://localhost:5000/api';

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await axios.post(`${baseUrl}/files`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Files uploaded successfully!');
      setFiles([]);
      fetchFiles();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${baseUrl}/files`);
      setUploadedFiles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const downloadFile = async (fileId, filename) => {
    try {
      const res = await axios.get(`${baseUrl}/files/${fileId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('File downloaded!');
    } catch (error) {
      toast.error('Failed to download file');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
      return <ImageIcon className="h-8 w-8" />;
    }
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext)) {
      return <FileTextIcon className="h-8 w-8" />;
    }
    return <FileIcon className="h-8 w-8" />;
  };

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Share <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Files</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload and share files instantly. Drag & drop or click to select files.
        </p>
      </div>

      {/* Upload Area */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card
          className={`cursor-pointer transition-all ${
            isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="pt-10 pb-10">
            <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {isDragging ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-muted-foreground mb-4">or click to browse</p>
              <p className="text-sm text-muted-foreground">Support for any file type</p>
            </div>
          </CardContent>
        </Card>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-bold">Selected Files ({files.length})</h3>
            <div className="space-y-3">
              {files.map((file, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="text-purple-600">{getFileIcon(file.name)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button onClick={uploadFiles} disabled={uploading} className="w-full" size="lg">
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        )}
      </div>

      {/* Uploaded Files */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Files</h2>
          <Button variant="outline" onClick={fetchFiles}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {uploadedFiles.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No files uploaded yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-purple-600">{getFileIcon(file.filename)}</div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base truncate">{file.filename}</CardTitle>
                      <CardDescription>{formatFileSize(file.size)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={() => downloadFile(file.id, file.filename)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
