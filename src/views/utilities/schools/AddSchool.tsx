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
import CardBox from 'src/components/shared/CardBox';

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

            <CardBox>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Header */}
                    <div className="bg-primary text-white px-6 py-4 -mx-6 -mt-6 rounded-t-lg">
                        <h2 className="text-xl font-semibold">School & Admin Details</h2>
                    </div>

                    <div className="px-6 py-4 space-y-6">
                        {/* School Name */}
                        <div className="space-y-2">
                            <Label htmlFor="schoolName" className="text-base font-medium">
                                School Name <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="schoolName"
                                type="text"
                                required
                                value={formData.schoolName}
                                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                className="w-full"
                                placeholder="Enter school name"
                            />
                        </div>

                        {/* School Admin Name */}
                        <div className="space-y-2">
                            <Label htmlFor="adminName" className="text-base font-medium">
                                School Admin Name <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="adminName"
                                type="text"
                                required
                                value={formData.adminName}
                                onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                                className="w-full"
                                placeholder="Enter admin name"
                            />
                        </div>

                        {/* School Admin Email */}
                        <div className="space-y-2">
                            <Label htmlFor="adminEmail" className="text-base font-medium">
                                School Admin Email <span className="text-error">*</span>
                            </Label>
                            <Input
                                id="adminEmail"
                                type="email"
                                required
                                value={formData.adminEmail}
                                onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                                className="w-full"
                                placeholder="Enter admin email"
                            />
                        </div>

                        {/* Subscription Plan */}
                        <div className="space-y-2">
                            <Label htmlFor="subscriptionPlan" className="text-base font-medium">
                                Subscription Plan <span className="text-error">*</span>
                            </Label>
                            <Select
                                required
                                value={formData.subscriptionPlan}
                                onValueChange={(value) => setFormData({ ...formData, subscriptionPlan: value })}
                            >
                                <SelectTrigger className="w-full">
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
                        <div className="space-y-2">
                            <Label className="text-base font-medium">
                                Initial Subscription Period <span className="text-error">*</span>
                            </Label>
                            <RadioGroup
                                value={formData.subscriptionPeriod}
                                onValueChange={(value) => setFormData({ ...formData, subscriptionPeriod: value })}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="monthly" id="monthly" />
                                    <Label htmlFor="monthly" className="font-normal cursor-pointer">
                                        Monthly
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
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
            </CardBox>
        </>
    );
};

export default AddSchool;
