import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { SchoolsTable } from './SchoolsTable';
import { SchoolsData } from './data';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Schools',
    },
];

const Schools = () => {
    return (
        <>
            <BreadcrumbComp title="Schools Management" items={BCrumb} />
            <div className="flex gap-6 flex-col">
                <SchoolsTable data={SchoolsData} />
            </div>
        </>
    );
};

export default Schools;
