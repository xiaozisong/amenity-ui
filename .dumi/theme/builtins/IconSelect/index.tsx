import React, { Suspense } from 'react';
import { Skeleton } from 'antd';
import { createStyles } from 'antd-style';

const SelecticonBtn = React.lazy(() => import('./IconSelector'));

const useStyle = createStyles(({ token, css }) => ({
  searchWrapper: css`
    display: flex;
    gap: 16px;
    > *:first-child {
      flex: 0 0 328px;
    }
    > *:last-child {
      flex: 1;
    }
  `,
  fallbackWrapper: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > * {
      flex: 0 0 15%;
      margin: ${token.marginXXS}px 0;
    }
  `,
  skeletonWrapper: css`
    text-align: center;

    > * {
      width: 100% !important;
    }
  `,
}));

const IconSelectFallback: React.FC = () => {
  const { styles } = useStyle();

  return (
    <>
      <div style={{ width: '50%' }}>
        <Skeleton.Input active />
      </div>
    </>
  );
};

const App: React.FC = (props: any) => {

  return <>
    <Suspense fallback={<IconSelectFallback />}>
      <SelecticonBtn {...props} />
    </Suspense>
  </>
}

export default App;
