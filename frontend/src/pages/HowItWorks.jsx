import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Download, 
  Share2, 
  Lock, 
  Zap, 
  ArrowRight,
  Smartphone,
  Wifi
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Choose What to Share',
      description: 'Select whether you want to share files or text snippets.',
      icon: Share2,
      color: 'from-purple-600 to-blue-600'
    },
    {
      number: 2,
      title: 'Upload Your Content',
      description: 'Drag & drop files or paste your text. It\'s that simple!',
      icon: Upload,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      number: 3,
      title: 'Share Instantly',
      description: 'Your content is instantly available across all your devices.',
      icon: Zap,
      color: 'from-cyan-600 to-green-600'
    },
    {
      number: 4,
      title: 'Access Anywhere',
      description: 'Download or copy your shared content from any device.',
      icon: Download,
      color: 'from-green-600 to-emerald-600'
    }
  ];

  const features = [
    {
      icon: Lock,
      title: 'Secure Transfer',
      description: 'All data is encrypted during transfer and storage'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant synchronization across all devices'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Works on desktop, mobile, and tablet'
    },
    {
      icon: Wifi,
      title: 'Always Available',
      description: 'Access your files anytime, anywhere'
    }
  ];

  const useCases = [
    {
      title: 'Share Files',
      description: 'Upload any file type - documents, images, videos, archives. No size limits, no restrictions.',
      icon: Upload,
      gradient: 'from-purple-600 to-pink-600',
      link: '/files'
    },
    {
      title: 'Share Text',
      description: 'Quickly share text snippets, notes, or code across devices. Perfect for quick transfers.',
      icon: FileText,
      gradient: 'from-blue-600 to-cyan-600',
      link: '/text'
    }
  ];

  return (
    <div className="container py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12 lg:mb-16">
        <Badge variant="secondary" className="mb-3 sm:mb-4 text-xs sm:text-sm">How It Works</Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-2">
          Simple, Fast, and{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Secure
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
          AirForShare makes sharing files and text between devices incredibly easy. 
          No registration, no complicated setup - just pure simplicity.
        </p>
      </div>

      {/* Steps Section */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Get Started in 4 Easy Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <step.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">Step {step.number}</Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-xs sm:text-sm lg:text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          What Can You Share?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-3 sm:mb-4`}>
                  <useCase.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <CardDescription className="text-xs sm:text-sm lg:text-base">
                  {useCase.description}
                </CardDescription>
                <Button asChild className="w-full" size="sm">
                  <Link to={useCase.link}>
                    Try Now
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Why Choose AirForShare?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mb-3 sm:mb-4">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-sm sm:text-base lg:text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <CardDescription className="text-xs sm:text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12 sm:mb-16 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 px-2">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Do I need to create an account?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <CardDescription className="text-xs sm:text-sm lg:text-base">
                No! AirForShare works without any registration. Just visit the site and start sharing immediately.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Is my data secure?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <CardDescription className="text-xs sm:text-sm lg:text-base">
                Yes! All data is encrypted during transfer and storage. We prioritize your privacy and security.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">What file types are supported?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <CardDescription className="text-xs sm:text-sm lg:text-base">
                All file types are supported! Share documents, images, videos, archives - anything you need.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Can I use it on mobile?</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <CardDescription className="text-xs sm:text-sm lg:text-base">
                Absolutely! AirForShare works perfectly on desktop, mobile, and tablet devices.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl lg:text-4xl px-2">
            Ready to Get Started?
          </CardTitle>
          <CardDescription className="text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 px-2">
            Start sharing files and text instantly. No sign-up required!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center p-6 sm:p-8 pt-0">
          <Button asChild size="default" className="w-full sm:w-auto">
            <Link to="/files">
              <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Share Files
            </Link>
          </Button>
          <Button asChild variant="outline" size="default" className="w-full sm:w-auto">
            <Link to="/text">
              <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Share Text
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
