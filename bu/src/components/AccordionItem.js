import { useRef } from "react";

const AccordionItem = ({ faq, active, onToggle }) => {
    const { question, answer } = faq;

    const contentEl = useRef();

    return(
        <li className={`accordion_item ${active ? "active" : ""}`}>
            <label className="label" onClick={onToggle}>
                {question}
                <span className="control">
                    {active ? "-":"+"}
                </span>
            </label>
            <div
             ref={contentEl} 
             className="answer_wrapper"
             style={
                 active
                 ? {height: contentEl.current.scrollHeight}
                 : {height: "0px"}
             }
             >
                <div className="answer">
                    {answer}
                </div>
            </div>
        </li>
    );
};

export default AccordionItem;