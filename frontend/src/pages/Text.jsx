import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, RefreshCw, Copy, Trash2, FileText } from 'lucide-react';

export default function Text() {
  const [inputText, setInputText] = useState('');
  const [textData, setTextData] = useState([]);

  const baseUrl = 'http://localhost:5000/api';

  const addText = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      toast.error('Please enter some text');
      return;
    }

    try {
      await axios.post(`${baseUrl}/text`, { text: inputText });
      toast.success('Text shared successfully!');
      getText();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to share text');
    }
  };

  const getText = async () => {
    try {
      const res = await axios.get(`${baseUrl}/text`);
      setTextData(res.data);
      setInputText('');
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const deleteText = async (id) => {
    try {
      await axios.delete(`${baseUrl}/text/${id}`);
      toast.success('Text deleted!');
      getText();
    } catch (error) {
      toast.error('Failed to delete text');
    }
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Share <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Text</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share text snippets instantly across devices. Perfect for quick notes and messages.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Enter your text</CardTitle>
            <CardDescription>Type or paste your text below to share it</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={addText} className="space-y-4">
              <Textarea
                placeholder="Type or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {inputText.length > 0 && (
                    <Badge variant="secondary">{inputText.length} characters</Badge>
                  )}
                </div>
                <Button type="submit" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Share Text
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Shared Texts */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Texts</h2>
          <Button variant="outline" onClick={getText}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {textData.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No texts shared yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {textData.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardDescription className="text-xs">
                          {new Date(item.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteText(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted rounded-lg p-4">
                    <p className="whitespace-pre-wrap break-words">{item.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{item.content.length} characters</Badge>
                    <Button variant="outline" onClick={() => copyToClipboard(item.content)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}