import "./error404.css";

export default function Error404() {
        return (
                <body>
                        <div className="App">
                                <div className="Error-404">
                                        <h1>ERROR 404: PAGE NOT FOUND</h1>
                                        <a href="/home" class="GoHome-Button">
                                                Go Home
                                        </a>
                                </div>
                        </div>
                </body>
        );
}
