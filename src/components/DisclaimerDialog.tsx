
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DisclaimerDialog = ({ isOpen, onAccept, onCancel, isLoading = false }: DisclaimerDialogProps) => {
  const [hasChecked, setHasChecked] = useState(false);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-xl font-bold text-cactus-800">
            <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
            noImpulse Educational Disclaimer
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 text-cactus-700">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 font-medium">
                  Please read this disclaimer carefully before proceeding with any courses.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3 text-sm">
                <p className="font-semibold">
                  IMPORTANT: The information provided in our courses is for educational purposes only.
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Educational Content Only:</h4>
                  <p>
                    All content, courses, and materials provided by noImpulse are strictly educational and informational. 
                    This is NOT personalized financial advice, investment recommendations, or professional financial planning services.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Your Responsibility:</h4>
                  <p>
                    You acknowledge that all financial decisions are your own responsibility. We do not guarantee any specific 
                    financial results or outcomes from applying the concepts taught in our courses.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Professional Consultation:</h4>
                  <p>
                    We strongly recommend consulting with qualified financial advisors, accountants, or other licensed 
                    professionals before making significant financial decisions.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">No Liability:</h4>
                  <p>
                    noImpulse and its creators are not responsible for any financial losses, damages, or adverse outcomes 
                    that may result from your financial decisions or application of course materials.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Market Risks:</h4>
                  <p>
                    All investments and financial strategies carry inherent risks. Past performance does not guarantee 
                    future results. You may lose money on any investment or financial decision.
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="disclaimer-agreement"
                    checked={hasChecked}
                    onCheckedChange={(checked) => setHasChecked(checked === true)}
                    className="mt-1"
                  />
                  <label htmlFor="disclaimer-agreement" className="text-sm font-medium cursor-pointer">
                    I understand and agree that I am solely responsible for my financial decisions. 
                    I acknowledge that noImpulse provides educational content only and is not liable 
                    for any financial outcomes resulting from my actions.
                  </label>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={onCancel}
            disabled={isLoading}
            className="order-2 sm:order-1"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onAccept}
            disabled={!hasChecked || isLoading}
            className="bg-cerulean-600 hover:bg-cerulean-700 order-1 sm:order-2"
          >
            {isLoading ? 'Processing...' : 'I Agree & Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisclaimerDialog;
