import React, { useEffect, Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const GetLaunches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  console.log(data);

  return (
    <>
      {data.launches.map((launch) => (
        <LaunchItem key={launch.flight_number} launch={launch} />
      ))}
    </>
  );
};

function Launches() {
  return (
    <div>
      <h1 className='display-4 my-3'>Launches</h1>
      {GetLaunches()}
    </div>
  );
}

export default Launches;
