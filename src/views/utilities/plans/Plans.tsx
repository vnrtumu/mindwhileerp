import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { PlansTable } from './PlansTable';
import { PlansData } from './data';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Manage Plans',
    },
];

const Plans = () => {
    return (
        <>
            <BreadcrumbComp title="Manage Subscription Plans" items={BCrumb} />
            <div className="flex gap-6 flex-col">
                <PlansTable data={PlansData} />
            </div>
        </>
    );
};

export default Plans;
