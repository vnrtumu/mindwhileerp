import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { PaymentHistoryTable } from './PaymentHistoryTable';
import { PaymentHistoryData } from './data';

const BCrumb = [
{
  to: '/',
  title: 'Home'
},
{
  title: 'Payment History'
}];


const PaymentHistory = () => {
  return (
    <div className="max-w-full overflow-hidden">
            <BreadcrumbComp title="Payment History" items={BCrumb} />
            <div className="flex gap-6 flex-col">
                <PaymentHistoryTable data={PaymentHistoryData} />
            </div>
        </div>);

};

export default PaymentHistory;