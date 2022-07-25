import React from "react";

export default function UserHeader({data}) {



    try {
        let post_date = "Postado em " + new Date(data.data().date).toLocaleDateString() + " as " + new Date(data.data().date).toLocaleTimeString()
        return (
            <div className="UserHeader">
                <img src="./RAFA.png"/>
                <div>
                    <span className="name">{data.data().username}</span>
                    <span>{post_date}</span>
                </div>
            </div>
        )
    }
    catch (e) {
        return (
            <div className="UserHeader">
                <img src="./RAFA.png"/>
                <div>
                    <span className="name">{data.displayName}</span>
                    <span>Público</span>
                </div>
            </div>
        )

    }

 
}