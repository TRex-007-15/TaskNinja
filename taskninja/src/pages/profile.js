import './profile.css'; // Import your CSS file
import userData from './user.json'; // Import the user data JSON file

const UserProfile = () => {

  return (
    <div className="dashboard">
      {userData && (
        <>
          {/* <div className="profile-picture">
            <img src={userData.profilePicture} alt="Profile Picture" />
          </div> */}
          <div className="user-details">
            {/* Display user details here */}
            <h2>Name: {userData.name}</h2>
            <p>Address: {userData.address}</p>
            <p>Services Requested: {userData.servicesRequested.join(', ')}</p>
            <p>Service to be Provided: {userData.servicesProvided.join(', ')}</p>
            <p>PIN Code: {userData.pinCode}</p>
          </div>
          <div className="services-grid">
            {/* Display services in a grid-based card layout */}
            {userData.services.map((service, index) => (
              <div className="service-card" key={index}>
                <h3>{service.name}</h3>
                <p>Description: {service.description}</p>
                <p>Price: {service.price}</p>
                {/* Add more service details as needed */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
