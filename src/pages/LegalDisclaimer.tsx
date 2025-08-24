
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const LegalDisclaimer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-cerulean-600 hover:text-cerulean-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-cactus-800">
              Legal Disclaimer & Important Notice
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-semibold">
                      IMPORTANT: This platform provides educational content only and is not financial advice.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Not Financial Advice</h2>
                <p>
                  The information provided on NoImpulse is for educational and informational purposes only. 
                  It should not be considered as professional financial, investment, tax, or legal advice. 
                  The content is designed to help students learn basic financial concepts and develop 
                  financial literacy skills.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">No Professional Relationship</h2>
                <p>
                  Using this platform does not create a professional advisory relationship between you and 
                  NoImpulse, its creators, or any affiliated parties. We are not licensed financial advisors, 
                  investment advisors, or tax professionals.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Individual Responsibility</h2>
                <p>
                  You are solely responsible for your financial decisions. Before making any financial decisions, 
                  you should:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Consult with qualified financial professionals</li>
                  <li>Conduct your own research and due diligence</li>
                  <li>Consider your individual financial situation, goals, and risk tolerance</li>
                  <li>Review all relevant documentation and terms</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Investment Risks</h2>
                <p>
                  All investments carry risk, including the potential loss of principal. Past performance 
                  does not guarantee future results. Market conditions, economic factors, and individual 
                  circumstances can significantly impact investment outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Limitation of Liability</h2>
                <p>
                  NoImpulse, its creators, employees, and affiliates shall not be liable for any direct, 
                  indirect, incidental, consequential, or punitive damages arising from your use of this 
                  platform or any financial decisions made based on the information provided.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Regulatory Compliance</h2>
                <p>
                  This platform complies with educational content guidelines. For official financial 
                  regulations and consumer protection information, please refer to:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <a href="https://www.sec.gov" target="_blank" rel="noopener noreferrer" className="text-cerulean-600 hover:underline">
                      U.S. Securities and Exchange Commission (SEC)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.finra.org" target="_blank" rel="noopener noreferrer" className="text-cerulean-600 hover:underline">
                      Financial Industry Regulatory Authority (FINRA)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.consumerfinance.gov" target="_blank" rel="noopener noreferrer" className="text-cerulean-600 hover:underline">
                      Consumer Financial Protection Bureau (CFPB)
                    </a>
                  </li>
                  <li>
                    <a href="https://www.federalreserve.gov" target="_blank" rel="noopener noreferrer" className="text-cerulean-600 hover:underline">
                      Federal Reserve System
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Updates to This Disclaimer</h2>
                <p>
                  This disclaimer may be updated periodically. Continued use of the platform constitutes 
                  acceptance of any changes. Please review this disclaimer regularly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-cactus-800 mb-4">Contact Information</h2>
                <p>
                  If you have questions about this disclaimer or need clarification about the educational 
                  nature of our content, please contact us at info@noimpulse.finance.
                </p>
              </section>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700 font-semibold">
                      Remember: Always consult with qualified professionals before making financial decisions. 
                      This platform is for educational purposes only.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
