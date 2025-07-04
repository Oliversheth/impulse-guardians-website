import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGoals } from '@/hooks/useGoals';
import { useToast } from '@/hooks/use-toast';
import { useAchievements } from '@/hooks/useAchievements';
import { Plus } from 'lucide-react';

interface CreateGoalDialogProps {
  trigger?: React.ReactNode;
  onGoalCreated?: () => void;
}

const CreateGoalDialog = ({ trigger, onGoalCreated }: CreateGoalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createGoal } = useGoals();
  const { toast } = useToast();
  const { checkAndUnlockAchievement } = useAchievements();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: 'savings',
    target_value: '',
    current_value: '0',
    target_date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      await createGoal({
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        goal_type: formData.goal_type,
        target_value: formData.target_value ? parseFloat(formData.target_value) : undefined,
        current_value: parseFloat(formData.current_value) || 0,
        target_date: formData.target_date || undefined
      });

      toast({
        title: "Goal Created",
        description: "Your financial goal has been created successfully!",
      });

      // Check for Goal Getter achievement
      await checkAndUnlockAchievement('goal_creation', { goalCount: 1 });

      setFormData({
        title: '',
        description: '',
        goal_type: 'savings',
        target_value: '',
        current_value: '0',
        target_date: ''
      });
      setOpen(false);
      onGoalCreated?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = (
    <Button className="gap-2">
      <Plus className="h-4 w-4" />
      Create Goal
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Goal Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Emergency Fund, Vacation Savings"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in more detail..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal_type">Goal Type</Label>
            <Select value={formData.goal_type} onValueChange={(value) => setFormData(prev => ({ ...prev, goal_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="debt_payoff">Debt Payoff</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_value">Target Amount ($)</Label>
              <Input
                id="target_value"
                type="number"
                min="0"
                step="0.01"
                placeholder="1000.00"
                value={formData.target_value}
                onChange={(e) => setFormData(prev => ({ ...prev, target_value: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_value">Current Amount ($)</Label>
              <Input
                id="current_value"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.current_value}
                onChange={(e) => setFormData(prev => ({ ...prev, current_value: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_date">Target Date (Optional)</Label>
            <Input
              id="target_date"
              type="date"
              value={formData.target_date}
              onChange={(e) => setFormData(prev => ({ ...prev, target_date: e.target.value }))}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !formData.title.trim()}>
              {loading ? 'Creating...' : 'Create Goal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoalDialog;