import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ThreeDots
      visible={true}
      height="70"
      width="80"
      color="rgb(28, 252, 181)"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClass=""
    />
  );
};

export default Loader;
