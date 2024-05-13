import { useState, useEffect } from "react"
import axios from 'axios'


const Meme =()=> {

    
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })
    
    const [allMeme, setAllMeme] = useState({})
    
    useEffect(()=> {
        console.log('Effect ran')
        axios.get("https://api.imgflip.com/get_memes")
            .then(data => {
                setAllMeme(data.data)
            })
    }, [])

    console.log(allMeme)


    const getMeme =()=> {
        
        const memes = allMeme.data.memes
        let idx = Math.floor(Math.random() * memes.length)
        
        // console.log(memes[idx].url)

        setMeme(prevState => ({
            ...prevState,
            randomImage: memes[idx].url
        }))

    }

    const handleChange =(event)=> {
        const { name, value } = event.target

        setMeme(prevState => ({...prevState, [name]: value}))
    }

    return (

        <section className="section meme-section">
            <div className="container">
                <div className="form meme-form">
                    <div className="row">
                        <div className="col">
                            <label 
                                htmlFor="topText"
                                className="form-label">
                                    Top Text
                            </label>
                            <input 
                                type="text"
                                name="topText"
                                onChange={handleChange}
                                value={meme.topText}
                                className="form-control text-1"
                                id="topText"
                            />
                        </div>
                        <div className="col">
                            <label 
                                htmlFor="bottomText"
                                className="form-label"
                                >
                                    Bottom Text
                            </label>
                            <input 
                                type="text"
                                name="bottomText"
                                onChange={handleChange}
                                value={meme.bottomText}
                                className="form-control text-2"
                                id="bottomText"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-grid">
                            <button className="btn submit-btn" type="button" onClick={getMeme}>Get a new meme image</button>
                        </div>
                    </div>
                </div>
                <div className="meme-img-div">
                    <img src={meme.randomImage} alt="get meme image" className="img-fluid image rounded"/>
                    <h2 className="meme-text top">{meme.topText}</h2>
                    <h2 className="meme-text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        </section>
    )
}

export default Meme