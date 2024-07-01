// ** Logo
import logo from "../../../assets/images/users/img-6.png"
const SpinnerComponent = () => {
    return (



        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 9999
            }}
        >
            <h1 className='text-white'>
                <img className="fallback-logo bg-black" src={logo} alt="logo" />
             {/*    <Spinner color="light" size="sm" type='grow' /> */}
            </h1>

        </div>
    )
}

export default SpinnerComponent
