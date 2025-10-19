import React from "react";

const JsonTreeRender = ({data}) =>{
    console.log(!Array.isArray(data));
    if (!Array.isArray(data)) return null;
    return (
        <React.Fragment>
            {
                data.map((data,index) => {
                    const probs = data?.probs ?? {};
                    const child = data?.children ?? [];
                    const Tags = data?.tag ?? 'div';
                    const text = data?.text ?? "";
                    if(!probs &&  !data.tag && !text) return ("nothing");
                    console.log("my tree")
                    return (
                        <Tags key = {index} {...probs}>
                            {text}
                            <JsonTreeRender data = {child} />
                        </Tags>
                    )

                })
            }
        </React.Fragment>
    )
}

export default JsonTreeRender;