import { AnalyticsResponse } from '@/action/analytics-action';
import SelectingLayers from '@/app/[lang]/(dashboard)/(main)/analytics/components/maps/selecting-layers';
import DashboardSelect from '@/components/dasboard-select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MapsProps {
  analytics: AnalyticsResponse | { status: string; message: string };
}

const Maps = ({ analytics }: MapsProps) => {
  return (
    <div>
      <Card>
        <CardHeader className='border-none pb-0'>
          <div className='flex flex-wrap items-center gap-2'>
            <div className='flex-1 whitespace-nowrap text-xl font-semibold text-default-900'>
              User By Country
            </div>
            <div className='flex-none'>
              <DashboardSelect />
            </div>
          </div>
        </CardHeader>
        <CardContent className='px-5 pb-0'>
          <SelectingLayers analytics={analytics} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Maps;
