import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Forget = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('/api/auth/forgot-password', { username,newPassword })
            .then(response => {
                const { success, newPassword } = response.data;
                if (success) {
                    console.log("Password reset successful");
                    alert('Password reset successful! Your new password is: ' + newPassword);
                    navigate('/login');
                } else {
                    alert('Username or answer incorrect. Please check your input.');
                }
            })
            .catch(error => {
                console.error('Error during password reset:', error);
                if (error.response) {
                    alert('Server Error: ' + error.response.data.message);
                } else if (error.request) {
                    alert('Request Error: Please check your network connection.');
                } else {
                    alert('Unexpected Error: Please try again later.');
                }
            });
    }

    return (
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Changing Password
					<span className='text-red-500 font-mono'> 8anime</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
          <button type="submit" className="btn btn-primary">Reset Password</button>
				</form>
			</div>
		</div>
    )
}

export default Forget;

