
import { AlertTriangle, Scale, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LegalDisclaimer = () => {
  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-cerulean-600 rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-cactus-800 mb-4">Legal Disclaimer</h1>
          <p className="text-xl text-cactus-600">Important information about our educational content</p>
        </div>

        <div className="space-y-8">
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Not Financial Advice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-yellow-700">
              <p className="font-semibold mb-2">
                The information provided on this website is for educational purposes only and does not constitute financial advice.
              </p>
              <p>
                NoImpulse and its content creators are not licensed financial advisors, investment advisors, or tax professionals. 
                The educational content, courses, and AI assistant responses should not be considered as personalized financial advice 
                or recommendations for specific financial decisions.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Educational Purpose</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Our platform provides:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>General financial education content</li>
                  <li>Interactive learning tools and resources</li>
                  <li>Basic budgeting and money management concepts</li>
                  <li>AI-powered educational assistance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Responsibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>Users are responsible for:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Making their own financial decisions</li>
                  <li>Consulting qualified professionals when needed</li>
                  <li>Conducting their own research</li>
                  <li>Understanding their personal financial situation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>NoImpulse, its owners, employees, and content creators shall not be liable</strong> for any direct, 
                indirect, incidental, consequential, or punitive damages arising from your use of this website or 
                reliance on any information provided herein.
              </p>
              
              <p>
                This includes, but is not limited to, financial losses, investment losses, or any other damages 
                that may result from financial decisions made based on the educational content provided on this platform.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Professional Consultation Required</h4>
                <p className="text-sm">
                  For personalized financial advice, investment guidance, tax planning, or other specific financial services, 
                  please consult with qualified licensed professionals including:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                  <li>Certified Financial Planners (CFP)</li>
                  <li>Registered Investment Advisors (RIA)</li>
                  <li>Certified Public Accountants (CPA)</li>
                  <li>Licensed financial advisors in your jurisdiction</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regulatory Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                This disclaimer is in accordance with:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Securities and Exchange Commission (SEC) guidelines</li>
                <li>Financial Industry Regulatory Authority (FINRA) regulations</li>
                <li>Consumer Financial Protection Bureau (CFPB) standards</li>
                <li>Federal Trade Commission (FTC) disclosure requirements</li>
              </ul>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  For more information about financial regulations and consumer protection, visit:
                </p>
                <ul className="list-disc pl-5 text-sm text-blue-700 mt-1">
                  <li>SEC.gov - U.S. Securities and Exchange Commission</li>
                  <li>FINRA.org - Financial Industry Regulatory Authority</li>
                  <li>ConsumerFinance.gov - Consumer Financial Protection Bureau</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-cactus-500 mt-8">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>© 2024 NoImpulse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalDisclaimer;
