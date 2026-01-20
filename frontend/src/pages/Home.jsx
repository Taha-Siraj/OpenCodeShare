import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Zap, Lock, Smartphone, CheckCircle, Image } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Share files and text at incredible speeds. No waiting, no delays. Just instant transfers.',
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We prioritize your privacy with end-to-end protection.',
      gradient: 'from-pink-600 to-red-600'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Works seamlessly across all your devices. Desktop, mobile, tablet - we\'ve got you covered.',
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Easy to Use',
      description: 'Simple, intuitive interface. No complicated setup. Just drag, drop, and share.',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      icon: FileText,
      title: 'No Registration',
      description: 'Start sharing immediately. No sign-up, no login, no hassle. Just pure simplicity.',
      gradient: 'from-orange-600 to-yellow-600'
    },
    {
      icon: Image,
      title: 'Any File Type',
      description: 'Share any file type - documents, images, videos, archives. No restrictions.',
      gradient: 'from-indigo-600 to-purple-600'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Share Files & Text
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Instantly & Securely
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Transfer files and text between devices seamlessly. No registration required. Fast, simple, and beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/files">
                  <Upload className="mr-2 h-5 w-5" />
                  Share Files
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/text">
                  <FileText className="mr-2 h-5 w-5" />
                  Share Text
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AirForShare</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the fastest and most secure way to share files and text across devices
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl">
                Ready to Start Sharing?
              </CardTitle>
              <CardDescription className="text-lg mt-4">
                Join thousands of users who trust AirForShare for their file and text sharing needs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/files">Get Started Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
