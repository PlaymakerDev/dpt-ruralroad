import FormLogin from "../components/formlogin";

const LoginPage2Screen = () => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/sundowntruck.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='text-white rounded-xl p-10 bg-black bg-opacity-50'>
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage2Screen;
