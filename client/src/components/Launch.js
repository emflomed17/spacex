import React, { Fragment, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const GetLaunch = (flight_number) => {
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;
  return (
    <>
      <h1 className='display-4 my-3'>
        <span className='text-dark'>Mission: {mission_name}</span>
      </h1>
      <h4 className='mb-3'>Launch Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Flight Number: {flight_number}</li>
        <li className='list-group-item'>Year: {launch_year}</li>
        <li className='list-group-item'>
          Success: {launch_success ? 'Yes' : 'No'}
        </li>
      </ul>
      <h4 className='my-3'>Rocket Details</h4>
      <ul className='list-group'>
        <li className='list-group-item'>Rocket ID: {rocket_id}</li>
        <li className='list-group-item'>Rocket Name: {rocket_name}</li>
        <li className='list-group-item'>Rocket Type: {rocket_type}</li>
      </ul>
      <hr />
      <Link to='/' className='btn btn-secondary'>
        Back
      </Link>
    </>
  );
};

const Launch = ({ match }) => {
  let { flight_number } = match.params;
  flight_number = parseInt(flight_number);
  return (
    <>
      <h1>Launch</h1>
      {GetLaunch(flight_number)}
    </>
  );
};

export default Launch;
