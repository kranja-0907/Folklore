import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";
const Paragraph = React.lazy(() => import("../../Components/Paragraph/paragraph"))

export default function Canvas({ addPost }) {
    useEffect(() => {
        import("./canvas.css")
    }, [])

    const [paragraphs, setDynamicParagraphs] = React.useState(0);
    const [posts, setPosts] = React.useState([]);

    const callAjax = (post) => {

    }

    const addParagraph = () => {
        setPosts(posts => [...posts, {
            content: "",
            imageBlob: "",
            choice1: "",
            choice2: "",
            conditions: []
        }])
    }

    return (
        <section className="home">
            <div className="text">Canvas</div>
            <nav className="myMenu">
                <input type="checkbox" href="#" className="myMenu-open" name="myMenu-open" id="myMenu-open" />
                <label className="myMenu-open-button" htmlFor="myMenu-open">
                    <span className="lines line-1"></span>
                    <span className="lines line-2"></span>
                    <span className="lines line-3"></span>
                </label>

                <a href="#" className="myMenu-item purple" id="btnAdd" onClick={() => addParagraph()}><i className="fa fa-plus"></i></a>
                <a href="postCreator" className="myMenu-item blue"><i className="fa fa-backward"></i></a>
                <a href="#" className="myMenu-item green" id="btnCreate" onClick={callAjax}><i className="fa fa-upload"></i></a>
                <a href="#" className="myMenu-item red" id="btnDelete" onClick={() => setPosts([{}])}><i className="fa fa-trash"></i></a>

            </nav>
            <div className="canvas">
                {posts.map((p, i) => {
                    return (
                        <Suspense key={i} fallback={<div>Loading Component....</div>}>
                            <Paragraph post={p} postNbr={i + 1} />
                        </Suspense>)
                })}
            </div>

            <Helmet>
                <script src="storyCreator.js"></script>
            </Helmet>
        </section>
    );
}