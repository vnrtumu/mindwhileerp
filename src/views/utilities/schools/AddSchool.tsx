import { useState } from 'react';
import { useNavigate } from 'react-router';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        to: '/super/utilities/schools',
        title: 'Schools',
    },
    {
        title: 'Add New School',
    },
];

const AddSchool = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        schoolName: '',
        adminName: '',
        adminEmail: '',
        subscriptionPlan: '',
        subscriptionPeriod: 'monthly',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // TODO: Add API call to create school
        navigate('/super/utilities/schools');
    };

    return (
        <>
            <BreadcrumbComp title="Add New School" items={BCrumb} />

            <div className="rounded-xl border border-border md:p-6 p-4">
                <h5 className="card-title">School & Admin Details</h5>

                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="flex flex-col gap-6">
                        {/* School Name */}
                        <div>
                            <Label htmlFor="schoolName">
                                School Name <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="schoolName"
                                type="text"
                                required
                                value={formData.schoolName}
                                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                placeholder="Enter school name"
                                className="mt-2"
                            />
                        </div>

                        {/* School Admin Name */}
                        <div>
                            <Label htmlFor="adminName">
                                School Admin Name <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="adminName"
                                type="text"
                                required
                                value={formData.adminName}
                                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                                placeholder="Enter admin name"
                                className="mt-2"
                            />
                        </div>

                        {/* School Admin Email */}
                        <div>
                            <Label htmlFor="adminEmail">
                                School Admin Email <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="adminEmail"
                                type="email"
                                required
                                value={formData.adminEmail}
                                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                                placeholder="Enter admin email"
                                className="mt-2"
                            />
                        </div>

                        {/* Subscription Plan */}
                        <div>
                            <Label htmlFor="subscriptionPlan">
                                Subscription Plan <span className="text-error">*</span>
                            </Label>
                            <Select
                                required
                                value={formData.subscriptionPlan}
                                onValueChange={(value) => setFormData({ ...formData, subscriptionPlan: value })}
                            >
                                <SelectTrigger className="mt-2 w-full">
                                    <SelectValue placeholder="-- Select a Plan --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="basic">Basic</SelectItem>
                                    <SelectItem value="standard">Standard</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="enterprise">Enterprise</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Initial Subscription Period */}
                        <div>
                            <Label>
                                Initial Subscription Period <span className="text-error">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.subscriptionPeriod}
                                onValueChange={(value) => setFormData({ ...formData, subscriptionPeriod: value })}
                                className="mt-2 flex gap-6"
                            >
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="monthly" id="monthly" />
                                    <Label htmlFor="monthly" className="font-normal cursor-pointer">
                                        Monthly
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <RadioGroupItem value="yearly" id="yearly" />
                                    <Label htmlFor="yearly" className="font-normal cursor-pointer">
                                        Yearly
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button type="submit" className="px-8">
                                Create School
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddSchool;
