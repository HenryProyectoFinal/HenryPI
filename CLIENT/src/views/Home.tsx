import { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

const allBrands = gql`
  query {
    allBrands {
      name
      id
    }
  }
`

type Brand = {
  name: String
  id: number
  active: Boolean
}

function Home() {
  useEffect(() => {
    localStorage.setItem('user-token', "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkI1R0hNXzRjZFQ3OTVwOEs2ZkJ1ViJ9.eyJpc3MiOiJodHRwczovL2Rldi03eXFubmU3MGxjdzdyMGN1LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJZVXV2bkxFbVBJUjhLRlFCTkE3cmJ4MXZ5Zm5xNlJpMUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9oZW5yeS1wZi8iLCJpYXQiOjE2NzM2MjUwNTIsImV4cCI6MTY3MzcxMTQ1MiwiYXpwIjoiWVV1dm5MRW1QSVI4S0ZRQk5BN3JieDF2eWZucTZSaTEiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.H9XBa_O-2olwuSQu8c-eJUAZPHKFsL76CrXvnDhrPvLcHst2nLQRIpv_AK766ooRmoaYyRoGcW8PArd0_N7KsTH1Pk_dIdSAd1iJ8HZPNfpViyOAymak0RWKPfOcXWIwCkGcgVeLGY438WPLell6nprQGXx8AoQbX_GubGmVskzsOnum5eu0T8t3WWT10-V0HdSn5s5sTXT8By0gRLvi8N97JdiUr6L7TTtAWDQU3swGKZ8p37m6b8quCO3aLnOBuAcxKlVqpBvwTOK021XdG4kdKPcS3rhkDgVEXooX5FlKGNKST0CeETESQhogDTkKGb06bYjbCRH0ETYYOr8_EQ")
  },[])

  const { data, error, loading } = useQuery(allBrands)
  
  if(error){
    return (
      <div>{error.message}</div>
    )   
  }

  if(loading){
    return (
      <>Loading...</>
    )
  }

  const brands = data.allBrands.map((brand: Brand) => {
    return <div>{brand.name}</div>
  })

  return (
    <div>
      {brands}
    </div>
  )
}

export default Home
