import { useState } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const BCrumb = [
{
  to: '/',
  title: 'Home'
},
{
  to: '/super/utilities/plans',
  title: 'Manage Plans'
},
{
  title: 'Add New Plan'
}];


const AddPlan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    planName: '',
    maxStudents: '',
    monthlyPrice: '',
    yearlyPrice: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Add API call to create plan
    navigate('/super/utilities/plans');
  };

  return (
    <>
            <BreadcrumbComp title="Add New Plan" items={BCrumb} />

            <div className="rounded-xl border border-border md:p-6 p-4">
                <h5 className="card-title">Plan Details</h5>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex flex-col gap-6">
                        {/* Plan Name */}
                        <div>
                            <Label htmlFor="planName">
                                Plan Name <span className="text-error">*</span>
                            </Label>
                            <Input
                id="planName"
                type="text"
                required
                value={formData.planName}
                onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                placeholder="Enter plan name"
                className="mt-2" />
              
                        </div>

                        {/* Max Students */}
                        <div>
                            <Label htmlFor="maxStudents">
                                Maximum Students <span className="text-error">*</span>
                            </Label>
                            <Input
                id="maxStudents"
                type="number"
                required
                value={formData.maxStudents}
                onChange={(e) => setFormData({ ...formData, maxStudents: e.target.value })}
                placeholder="Enter maximum number of students"
                className="mt-2" />
              
                        </div>

                        {/* Monthly Price */}
                        <div>
                            <Label htmlFor="monthlyPrice">
                                Monthly Price (₹) <span className="text-error">*</span>
                            </Label>
                            <Input
                id="monthlyPrice"
                type="number"
                step="0.01"
                required
                value={formData.monthlyPrice}
                onChange={(e) => setFormData({ ...formData, monthlyPrice: e.target.value })}
                placeholder="Enter monthly price"
                className="mt-2" />
              
                        </div>

                        {/* Yearly Price */}
                        <div>
                            <Label htmlFor="yearlyPrice">
                                Yearly Price (₹) <span className="text-error">*</span>
                            </Label>
                            <Input
                id="yearlyPrice"
                type="number"
                step="0.01"
                required
                value={formData.yearlyPrice}
                onChange={(e) => setFormData({ ...formData, yearlyPrice: e.target.value })}
                placeholder="Enter yearly price"
                className="mt-2" />
              
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button type="submit" className="px-8">
                                Create Plan
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>);

};

export default AddPlan;