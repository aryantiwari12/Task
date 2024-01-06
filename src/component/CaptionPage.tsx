import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useMatch } from "react-router-dom"
import { fabric } from "fabric";
import { log } from "fabric/fabric-impl";
const CaptionPage = () => {
    var imgURL = 'https://images.unsplash.com/photo-1642290998771-f2d011f324e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NDg5MzB8MHwxfGFsbHwxfHx8fHx8Mnx8MTcwNDQ3MjgyN3w&ixlib=rb-4.0.3&q=85';
    var canvas1 = new fabric.Canvas('canvas');
    var pugImg = new Image();
    pugImg.onload = function (img) {    
        var pug = new fabric.Image(pugImg, {
            angle: 45,
            width: 500,
            height: 500,
            left: 50,
            top: 70,
            scaleX: .25,
            scaleY: .25
        });
        canvas1.add(pug);
        console.log(pug,"pugg");
        
    };
    const match = useMatch('/caption/:name')
    console.log(match?.params.name, "name");
    const [value, setValue] = useState('')
    const [state, setState] = useState<any>('')
    pugImg.src = state?.urls?.small;
    const canvasRef = useRef(null);
    const initialse = async () => {
        try {
            const apiRes: any = await axios.get(`https://api.unsplash.com/users/${match?.params?.name as string}/photos/?client_id=DUN9Dr6HrxXOiLQgC6Hcxp7k5_ZJOzPbS8MX1qkn3wA`, {
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
            console.log(apiRes, "apiress");
            debugger
            setState(apiRes?.data[0])
        } catch (error) {
        }
        console.log(state?.urls, "stateUrls");
    }

    const onChangeCreate = async() => {
        const userData = {
            title: "caption",
          };
        try {
           const apiRes= await axios.post("https://api.unsplash.com/collections",userData ,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'client_id':'DUN9Dr6HrxXOiLQgC6Hcxp7k5_ZJOzPbS8MX1qkn3wA'
               },
            })
        } catch (error) {
          console.log(error);
        }
    }
    
    var circle = new fabric.Circle({
        fill: "#ffff00",
        radius: 50,
        left: 150,
        top: 150,
        originX: "center",
        originY: "center",
      });
      
      canvas1.add(circle);
    var text = new fabric.IText("Please Enter Caption", {
        fontSize: 27,
        top: 10,
        left: 10
      });
      canvas1.add(text);
      const  downloadText=()=> {
        console.log("run")
        debugger
        var textContent:any = Text;
        var blob = new Blob([textContent], { type: 'text/plain' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'canvas_text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
   
     

    useEffect(() => {
        initialse()
    }, [])
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 border">
                            <div className={`shapes ${value} mt-3`}>
                                {/* <img src={state?.urls?.small} /> */}
                                <canvas id="canvas" width="640" height="480"></canvas>
                            </div>
                            {/* <div className="d-flex mt-3 gap-3">
                                <button className="btn text-primary border-primary bg-transparent w-100" onClick={() => addRect(`shapes`)}>Rectangle</button>
                                <button className="btn text-primary border-primary bg-transparent w-100" onClick={() => addRect(`square`)}>Square</button>
                                <button className="btn text-primary border-primary bg-transparent w-100" onClick={() => addRect(`circle`)}>Circle</button>
                            </div> */}
                            
                            <div className="mb-2 p-2">
                            </div>
                            {/* <canvas ref={canvasRef}></canvas> */}
                            
                            <button className="btn text-primary border-primary bg-transparent w-100"  onClick={()=>downloadText()}>Download</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default CaptionPage;