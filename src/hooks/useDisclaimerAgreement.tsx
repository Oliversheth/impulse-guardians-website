
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useDisclaimerAgreement = () => {
  const [hasAgreed, setHasAgreed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setHasAgreed(null);
      return;
    }

    checkAgreementStatus();
  }, [user]);

  const checkAgreementStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('user_agreements')
        .select('*')
        .eq('user_id', user?.id)
        .eq('agreement_type', 'course_disclaimer')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking agreement status:', error);
      } else {
        setHasAgreed(!!data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const recordAgreement = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('user_agreements')
        .insert({
          user_id: user.id,
          agreement_type: 'course_disclaimer',
        });

      if (error) {
        console.error('Error recording agreement:', error);
        return false;
      }

      setHasAgreed(true);
      return true;
    } catch (error) {
      console.error('Error recording agreement:', error);
      return false;
    }
  };

  return {
    hasAgreed,
    loading,
    recordAgreement
  };
};
