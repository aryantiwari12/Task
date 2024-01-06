import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Task = () => {
    const [state, setState] = useState({
    } as any)
    const location = useLocation()
    const navigate = useNavigate()
    const searchParam: any = new URLSearchParams(location?.search)
    const query = searchParam.get('search')
    const initialse = async () => {
        try {
            const apiRes: any = await axios.get(`https://api.unsplash.com/search/photos/?client_id=DUN9Dr6HrxXOiLQgC6Hcxp7k5_ZJOzPbS8MX1qkn3wA&query=${query}`, {
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
            // console.log(apiRes,"apiress");
            setState(apiRes?.data?.results)
        } catch (error) {

        }
    }
    const handleChange = (name: any, value: any) => {
        console.log(value, name);

        if (value) {
            searchParam?.set(name, value)
            navigate({ search: searchParam.toString() })
        }
        else {
            searchParam.delete("name")
            navigate("/")
        }

    }

    useEffect(() => {
        initialse()
    }, [searchParam.get("search")])
    console.log(state
        , "22222222222222222222222222222222222222222222222");

    return (
        <>
            <section>
                <div className="container">
                    <div className="div1">
                        <div className="px-3">
                            <input className="form-control" onChange={(e) => handleChange("search", e.target.value)} placeholder='Search image...' />
                        </div>

                        <div className="image-gallery">
                            {state?.length ? state?.map((res: any, index: number) => <div className='image-outer'>
                                <div className="image">
                                    <img src={res?.urls?.small} alt="Not found" />
                                </div>
                                <Link to={`/caption/${res?.user?.name.split(" ").join('')}`}>  <button className="btn btn-primary">Add Caption</button></Link>
                            </div>) : ""}
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Task