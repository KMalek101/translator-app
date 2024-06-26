import { useEffect } from "react";
import { useState } from "react";
import Axios from 'axios'
import languagesDATA from "./assets/isos.json"
import copy from "copy-to-clipboard"

function Page(){
    const numOfDivs = 6;
    const MaxLength = 500;

    const [count, setCount] = useState(0);
    const [translateText, setTranslateText] = useState("Hello, how are you?");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState("en");
    const [targetLanguage, setTargetLanguage] = useState("fr");
    const [clicked, setClicked] = useState(true);
    const [langWord, setLangWord] = useState(Array(numOfDivs).fill('lang-word'));
    const [checkLangWord, setCheckLangWord] = useState(Array(numOfDivs).fill(false));
    const [classScroll, setClassScroll] = useState("empty");
    const [classScrollTranslated, setClassScrollTranslated] = useState("empty");
    const [classTextArea, setClassTextArea] = useState("myTextArea");
    const [checkClasses, setCheckClasses] = useState(false);
    const [checkClassesTranslated, setCheckClassesTranslated] = useState(false);
    const [languagesTranslate, setLanguagesTranslate] = useState(languagesDATA);
    const [languagesTranslated, setLanguagesTranslated] = useState(languagesDATA);
    const [copyClassTranslate, setCopyClassTranslate] = useState("p-clipboard")
    const [copyClassTranslated, setCopyClassTranslated] = useState("p-clipboard")
    const [emptyCase, setEmptyCase] = useState("p-empty")
    const [emptyCaseTranslated, setEmptyCaseTranslated] = useState("p-empty")

    useEffect(()=>{
        const newarray = [...langWord]
        newarray[0] += ' active'
        newarray[4] += ' active'
        setLangWord(newarray)
    }, [])

    const toggleClasses = ()=>{
        if(!checkClasses){
            setClassScroll("scroll");
            setClassTextArea("empty");
            setCheckClasses(!checkClasses);
        }else{
            setClassScroll("empty");
            setClassTextArea("myTextArea");
            setCheckClasses(!checkClasses);
        }
    }

    const langWordActive = (i)=>{
        setLangWord(prevLangWord=>
            prevLangWord.map((word, index)=>
                   (i < 3 && index < 3 || i >= 3 && index >= 3) ?  
                   (index === i ? 'lang-word active' : 'lang-word') : word)
        );

        setCheckLangWord(prevCheckLangWord=>
            prevCheckLangWord.map((bool, index)=>
                index === i ? true : false)
        )
        if(i < 3){
            setSourceLanguage(languagesTranslate[i].iso);
        }
        if(i >= 3){
            setTargetLanguage(languagesTranslated[i - 3].iso);
        }
    }

    const toggleClassesTranslated = ()=>{
        if(!checkClassesTranslated){
            setClassScrollTranslated("scroll-translated");
            setCheckClassesTranslated(!checkClassesTranslated);
        }else{
            setClassScrollTranslated("empty");
            setCheckClassesTranslated(!checkClassesTranslated);
        }
    }

    function changePlaceTranslate(i){
        const uplanguages = [...languagesTranslate]
        const temp = uplanguages.splice(i, 1);
        uplanguages.unshift(temp[0]);
        setLanguagesTranslate(uplanguages);
        setSourceLanguage(uplanguages[0].iso)
        let t = langWord.lastIndexOf("lang-word active")
        const newarray = new Array(numOfDivs).fill("lang-word");
        newarray[0] = newarray[t] = ("lang-word active")
        setLangWord(newarray);
    }

    function changePlaceTranslated(i){
        const uplanguages = [...languagesTranslated]
        const temp = uplanguages.splice(i, 1);
        uplanguages.unshift(temp[0]);
        setLanguagesTranslated(uplanguages);
        setTargetLanguage(uplanguages[0].iso)
        let t = langWord.findIndex(x => x === "lang-word active");
        const newarray = new Array(numOfDivs).fill("lang-word");
        newarray[3] = newarray[t] = ("lang-word active")
        setLangWord(newarray);
    }
    
    const reverseLanguages = () =>{
        if(!translateText || !translatedText){
            alert("There has to be a text to translate to reverse")
            return
        }
        let temp1, temp2;
        for(let i = 0; i < numOfDivs; i++){
            if (langWord[i] === 'lang-word active' && i < 3 ) {
                temp1 = i;
            }
            if (langWord[i] === 'lang-word active' && i >= 3) {
                temp2 = i - 3;
            }
        }
        let index2 = languagesTranslate.findIndex(x => x.language === languagesTranslated[temp2].language)
        let index = languagesTranslated.findIndex(x => x.language === languagesTranslate[temp1].language)

        if(index2 >= 3){
            const uplanguages = [...languagesTranslate]
            const temp = uplanguages.splice(index2, 1);
            uplanguages.unshift(temp[0]);
            setLanguagesTranslate(uplanguages);
            index2 = 0;
        }

        if(index >= 3){
            const uplanguages = [...languagesTranslated]
            const temp = uplanguages.splice(index, 1);
            uplanguages.unshift(temp[0]);
            setLanguagesTranslated(uplanguages);
            index = 0;
        }

        if(index < 3 && index2 < 3){
            const newarray = new Array(numOfDivs).fill("lang-word");
            newarray[index2] = newarray[index + 3] = ("lang-word active")
            setLangWord(newarray);
            // console.log("done")
            setSourceLanguage(languagesTranslate[index2].iso);
            setTargetLanguage(languagesTranslated[index].iso);
            temp1 = translateText;
            setTranslateText(translatedText);
            setTranslatedText(temp1);
        }
    }

    const CopyToClipboard = ()=>{
        if(translateText){
            copy(translateText)
            setCopyClassTranslate("p-clipboard shown")
            setTimeout(() => {
                setCopyClassTranslate("p-clipboard")
            }, 1000);
        }else{
            setEmptyCase(old=> old + " shown")
            setTimeout(() => {
                setEmptyCase("p-empty")
            }, 2000);
        }
    }

    const CopyToClipboardTranslated = ()=>{
        if(translatedText){
            copy(translatedText)
            setCopyClassTranslated("p-clipboard shown-translated")
            setTimeout(() => {
                setCopyClassTranslated("p-clipboard")
            }, 1000);
        }else{
            setEmptyCaseTranslated(old=> old + " shown")
            setTimeout(() => {
                setEmptyCaseTranslated("p-empty")
            }, 2000);
        }
        
    }

    const HearTheVoices = ()=>{
        if(translateText){
            let index = languagesTranslate.findIndex(x => x.iso === sourceLanguage)
            responsiveVoice.speak(translateText, languagesTranslate[index].voice);
        }
        else{
            setEmptyCase(old=> old + " shown")
            setTimeout(() => {
                setEmptyCase("p-empty")
            }, 2000);
        }
    }

    const HearTheVoicesTranslated = ()=>{
        if(translatedText){
            let index = languagesTranslated.findIndex(x => x.iso === targetLanguage)
            responsiveVoice.speak(translatedText, languagesTranslated[index].voice);
        }
        else{
            setEmptyCaseTranslated(old=> old + " shown")
            setTimeout(() => {
                setEmptyCaseTranslated("p-empty")
            }, 2000);        }
    }
    
    const fetchCard = async() =>{ 
        if(clicked){
            if(sourceLanguage === targetLanguage){
                alert("source language and target language must be diffrent to continue")
            }
        try {    
            const res = await Axios.get(`https://api.mymemory.translated.net/get?q=${translateText}&langpair=${sourceLanguage}|${targetLanguage}`)
                setTranslatedText(res.data.responseData.translatedText)
                setClicked(false);

        }catch(error) {
                console.error("Error fetching excuse:", error);
            };
        }}
    
        useEffect( () => {
            fetchCard();
        });

    useEffect(() => {
        if (translateText.length <= MaxLength) {
            setCount(translateText.length);
        }
        else{
            setCount(MaxLength);
            setTranslateText(translateText.slice(0, MaxLength));
            alert("you can't surpass the limit MaxLength chars");
        }

    }, [translateText])

    return<>
    
        <div className="background-container">
            <img src="./hero_img.jpg" alt="backgroundIMG"></img>
            <div className="background-color"></div>
        </div>

        <div className="elements-container">
            <div className="logo-container">
                <svg width="137" height="45" viewBox="0 0 137 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.625 13.6232C34.4583 17.5685 34.4583 27.4315 27.625 31.3768C20.7917 35.322 12.25 30.3905 12.25 22.5C12.25 14.6095 20.7917 9.67801 27.625 13.6232Z" stroke="#F9FAFB" stroke-width="2"/>
                    <path d="M13.5971 13.797C12.8708 11.5073 14.1838 9.23305 16.53 8.71726C18.8761 8.20147 21.3668 9.63951 22.0932 11.9292L24.0533 23.1955C24.7797 25.4852 24.6216 26.3124 22.2754 26.8282C19.9293 27.344 19.1165 26.1588 18.3901 23.8691L13.5971 13.797Z" fill="#F9FAFB"/>
                    <path d="M34.3214 23.0128C36.7164 23.711 38.217 26.0935 37.673 28.3343C37.129 30.5751 34.7464 31.8257 32.3514 31.1276L21.6656 26.4761C19.2706 25.7779 18.1852 25.0528 18.7292 22.812C19.2732 20.5712 19.9455 20.3286 22.3405 21.0268L28.331 22.0198L34.3214 23.0128Z" fill="#F9FAFB"/>
                    <path d="M17.6015 34.3703C15.9329 35.9618 13.1193 35.8536 11.3172 34.1285C9.51506 32.4035 9.40683 29.7149 11.0754 28.1233L19.6718 22.6491C21.3404 21.0575 21.9353 21.1626 23.7374 22.8876C25.5395 24.6127 24.6014 24.0981 22.9327 25.6897L17.6015 34.3703Z" fill="#F9FAFB"/>
                    <path d="M49.29 27.5C48.51 27.5 47.885 27.31 47.415 26.93C46.945 26.55 46.71 25.875 46.71 24.905V21.665H45.435V20.06H46.71L46.935 18.065H48.63V20.06H50.64V21.665H48.63V24.92C48.63 25.28 48.705 25.53 48.855 25.67C49.015 25.8 49.285 25.865 49.665 25.865H50.595V27.5H49.29ZM52.2885 27.5V20.06H53.9985L54.1785 21.455C54.4485 20.975 54.8135 20.595 55.2735 20.315C55.7435 20.025 56.2935 19.88 56.9235 19.88V21.905H56.3835C55.9635 21.905 55.5885 21.97 55.2585 22.1C54.9285 22.23 54.6685 22.455 54.4785 22.775C54.2985 23.095 54.2085 23.54 54.2085 24.11V27.5H52.2885ZM60.8007 27.68C60.1607 27.68 59.6357 27.58 59.2257 27.38C58.8157 27.17 58.5107 26.895 58.3107 26.555C58.1107 26.215 58.0107 25.84 58.0107 25.43C58.0107 24.74 58.2807 24.18 58.8207 23.75C59.3607 23.32 60.1707 23.105 61.2507 23.105H63.1407V22.925C63.1407 22.415 62.9957 22.04 62.7057 21.8C62.4157 21.56 62.0557 21.44 61.6257 21.44C61.2357 21.44 60.8957 21.535 60.6057 21.725C60.3157 21.905 60.1357 22.175 60.0657 22.535H58.1907C58.2407 21.995 58.4207 21.525 58.7307 21.125C59.0507 20.725 59.4607 20.42 59.9607 20.21C60.4607 19.99 61.0207 19.88 61.6407 19.88C62.7007 19.88 63.5357 20.145 64.1457 20.675C64.7557 21.205 65.0607 21.955 65.0607 22.925V27.5H63.4257L63.2457 26.3C63.0257 26.7 62.7157 27.03 62.3157 27.29C61.9257 27.55 61.4207 27.68 60.8007 27.68ZM61.2357 26.18C61.7857 26.18 62.2107 26 62.5107 25.64C62.8207 25.28 63.0157 24.835 63.0957 24.305H61.4607C60.9507 24.305 60.5857 24.4 60.3657 24.59C60.1457 24.77 60.0357 24.995 60.0357 25.265C60.0357 25.555 60.1457 25.78 60.3657 25.94C60.5857 26.1 60.8757 26.18 61.2357 26.18ZM66.893 27.5V20.06H68.588L68.738 21.32C68.968 20.88 69.298 20.53 69.728 20.27C70.168 20.01 70.683 19.88 71.273 19.88C72.193 19.88 72.908 20.17 73.418 20.75C73.928 21.33 74.183 22.18 74.183 23.3V27.5H72.263V23.48C72.263 22.84 72.133 22.35 71.873 22.01C71.613 21.67 71.208 21.5 70.658 21.5C70.118 21.5 69.673 21.69 69.323 22.07C68.983 22.45 68.813 22.98 68.813 23.66V27.5H66.893ZM79.0939 27.68C78.4339 27.68 77.8539 27.575 77.3539 27.365C76.8539 27.145 76.4539 26.845 76.1539 26.465C75.8539 26.085 75.6739 25.645 75.6139 25.145H77.5489C77.6089 25.435 77.7689 25.685 78.0289 25.895C78.2989 26.095 78.6439 26.195 79.0639 26.195C79.4839 26.195 79.7889 26.11 79.9789 25.94C80.1789 25.77 80.2789 25.575 80.2789 25.355C80.2789 25.035 80.1389 24.82 79.8589 24.71C79.5789 24.59 79.1889 24.475 78.6889 24.365C78.3689 24.295 78.0439 24.21 77.7139 24.11C77.3839 24.01 77.0789 23.885 76.7989 23.735C76.5289 23.575 76.3089 23.375 76.1389 23.135C75.9689 22.885 75.8839 22.58 75.8839 22.22C75.8839 21.56 76.1439 21.005 76.6639 20.555C77.1939 20.105 77.9339 19.88 78.8839 19.88C79.7639 19.88 80.4639 20.085 80.9839 20.495C81.5139 20.905 81.8289 21.47 81.9289 22.19H80.1139C80.0039 21.64 79.5889 21.365 78.8689 21.365C78.5089 21.365 78.2289 21.435 78.0289 21.575C77.8389 21.715 77.7439 21.89 77.7439 22.1C77.7439 22.32 77.8889 22.495 78.1789 22.625C78.4689 22.755 78.8539 22.875 79.3339 22.985C79.8539 23.105 80.3289 23.24 80.7589 23.39C81.1989 23.53 81.5489 23.745 81.8089 24.035C82.0689 24.315 82.1989 24.72 82.1989 25.25C82.2089 25.71 82.0889 26.125 81.8389 26.495C81.5889 26.865 81.2289 27.155 80.7589 27.365C80.2889 27.575 79.7339 27.68 79.0939 27.68ZM83.8998 27.5V16.7H85.8198V27.5H83.8998ZM90.3466 27.68C89.7066 27.68 89.1816 27.58 88.7716 27.38C88.3616 27.17 88.0566 26.895 87.8566 26.555C87.6566 26.215 87.5566 25.84 87.5566 25.43C87.5566 24.74 87.8266 24.18 88.3666 23.75C88.9066 23.32 89.7166 23.105 90.7966 23.105H92.6866V22.925C92.6866 22.415 92.5416 22.04 92.2516 21.8C91.9616 21.56 91.6016 21.44 91.1716 21.44C90.7816 21.44 90.4416 21.535 90.1516 21.725C89.8616 21.905 89.6816 22.175 89.6116 22.535H87.7366C87.7866 21.995 87.9666 21.525 88.2766 21.125C88.5966 20.725 89.0066 20.42 89.5066 20.21C90.0066 19.99 90.5666 19.88 91.1866 19.88C92.2466 19.88 93.0816 20.145 93.6916 20.675C94.3016 21.205 94.6066 21.955 94.6066 22.925V27.5H92.9716L92.7916 26.3C92.5716 26.7 92.2616 27.03 91.8616 27.29C91.4716 27.55 90.9666 27.68 90.3466 27.68ZM90.7816 26.18C91.3316 26.18 91.7566 26 92.0566 25.64C92.3666 25.28 92.5616 24.835 92.6416 24.305H91.0066C90.4966 24.305 90.1316 24.4 89.9116 24.59C89.6916 24.77 89.5816 24.995 89.5816 25.265C89.5816 25.555 89.6916 25.78 89.9116 25.94C90.1316 26.1 90.4216 26.18 90.7816 26.18ZM99.6513 27.5C98.8713 27.5 98.2463 27.31 97.7763 26.93C97.3063 26.55 97.0713 25.875 97.0713 24.905V21.665H95.7963V20.06H97.0713L97.2963 18.065H98.9913V20.06H101.001V21.665H98.9913V24.92C98.9913 25.28 99.0663 25.53 99.2163 25.67C99.3763 25.8 99.6463 25.865 100.026 25.865H100.956V27.5H99.6513ZM106.074 27.68C105.324 27.68 104.659 27.52 104.079 27.2C103.499 26.88 103.044 26.43 102.714 25.85C102.384 25.27 102.219 24.6 102.219 23.84C102.219 23.07 102.379 22.385 102.699 21.785C103.029 21.185 103.479 20.72 104.049 20.39C104.629 20.05 105.309 19.88 106.089 19.88C106.819 19.88 107.464 20.04 108.024 20.36C108.584 20.68 109.019 21.12 109.329 21.68C109.649 22.23 109.809 22.845 109.809 23.525C109.809 23.635 109.804 23.75 109.794 23.87C109.794 23.99 109.789 24.115 109.779 24.245H104.124C104.164 24.825 104.364 25.28 104.724 25.61C105.094 25.94 105.539 26.105 106.059 26.105C106.449 26.105 106.774 26.02 107.034 25.85C107.304 25.67 107.504 25.44 107.634 25.16H109.584C109.444 25.63 109.209 26.06 108.879 26.45C108.559 26.83 108.159 27.13 107.679 27.35C107.209 27.57 106.674 27.68 106.074 27.68ZM106.089 21.44C105.619 21.44 105.204 21.575 104.844 21.845C104.484 22.105 104.254 22.505 104.154 23.045H107.859C107.829 22.555 107.649 22.165 107.319 21.875C106.989 21.585 106.579 21.44 106.089 21.44ZM114.844 27.68C114.144 27.68 113.519 27.51 112.969 27.17C112.419 26.83 111.984 26.365 111.664 25.775C111.344 25.185 111.184 24.515 111.184 23.765C111.184 23.015 111.344 22.35 111.664 21.77C111.984 21.18 112.419 20.72 112.969 20.39C113.519 20.05 114.144 19.88 114.844 19.88C115.404 19.88 115.894 19.985 116.314 20.195C116.734 20.405 117.074 20.7 117.334 21.08V16.7H119.254V27.5H117.544L117.334 26.435C117.094 26.765 116.774 27.055 116.374 27.305C115.984 27.555 115.474 27.68 114.844 27.68ZM115.249 26C115.869 26 116.374 25.795 116.764 25.385C117.164 24.965 117.364 24.43 117.364 23.78C117.364 23.13 117.164 22.6 116.764 22.19C116.374 21.77 115.869 21.56 115.249 21.56C114.639 21.56 114.134 21.765 113.734 22.175C113.334 22.585 113.134 23.115 113.134 23.765C113.134 24.415 113.334 24.95 113.734 25.37C114.134 25.79 114.639 26 115.249 26ZM122.034 27.605C121.684 27.605 121.394 27.495 121.164 27.275C120.944 27.055 120.834 26.79 120.834 26.48C120.834 26.16 120.944 25.89 121.164 25.67C121.394 25.45 121.684 25.34 122.034 25.34C122.384 25.34 122.669 25.45 122.889 25.67C123.119 25.89 123.234 26.16 123.234 26.48C123.234 26.79 123.119 27.055 122.889 27.275C122.669 27.495 122.384 27.605 122.034 27.605ZM125.848 18.905C125.498 18.905 125.208 18.8 124.978 18.59C124.758 18.38 124.648 18.115 124.648 17.795C124.648 17.475 124.758 17.215 124.978 17.015C125.208 16.805 125.498 16.7 125.848 16.7C126.198 16.7 126.483 16.805 126.703 17.015C126.933 17.215 127.048 17.475 127.048 17.795C127.048 18.115 126.933 18.38 126.703 18.59C126.483 18.8 126.198 18.905 125.848 18.905ZM124.888 27.5V20.06H126.808V27.5H124.888ZM132.382 27.68C131.662 27.68 131.012 27.515 130.432 27.185C129.862 26.855 129.407 26.4 129.067 25.82C128.737 25.23 128.572 24.55 128.572 23.78C128.572 23.01 128.742 22.335 129.082 21.755C129.422 21.165 129.877 20.705 130.447 20.375C131.027 20.045 131.677 19.88 132.397 19.88C133.107 19.88 133.747 20.045 134.317 20.375C134.897 20.705 135.352 21.165 135.682 21.755C136.022 22.335 136.192 23.01 136.192 23.78C136.192 24.55 136.022 25.23 135.682 25.82C135.352 26.4 134.897 26.855 134.317 27.185C133.737 27.515 133.092 27.68 132.382 27.68ZM132.382 26.015C132.882 26.015 133.317 25.83 133.687 25.46C134.057 25.08 134.242 24.52 134.242 23.78C134.242 23.04 134.057 22.485 133.687 22.115C133.317 21.735 132.887 21.545 132.397 21.545C131.887 21.545 131.447 21.735 131.077 22.115C130.717 22.485 130.537 23.04 130.537 23.78C130.537 24.52 130.717 25.08 131.077 25.46C131.447 25.83 131.882 26.015 132.382 26.015Z" fill="#F9FAFB"/>
                </svg>
            </div>
            <div className="boxes-container">

                <div className="box translate">
                    {/* top header to select a language */}

                        <div className="languages">
    
                            <h4 onClick={()=>langWordActive(0)} className={langWord[0]}>{languagesTranslate[0].language}</h4>
                            <h4 onClick={()=>langWordActive(1)} className={langWord[1]}>{languagesTranslate[1].language}</h4>
    
                            <div className="spanish">
                                <h4 onClick={()=>langWordActive(2)} className={`${langWord[2]} lang-es`}>{languagesTranslate[2].language}</h4>
                                <svg onClick={toggleClasses} style={{cursor: "pointer"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6L8 10L4 6" stroke="#6C727F" stroke-width="2"/>
                                </svg>
                            </div>
                        </div>

                    <div className="line"></div>
                    <div className={classScroll}>
                        {languagesTranslate.map((lang, i) => {
                            return<>
                                <div key={i} onClick={ ()=>changePlaceTranslate(i)} className="lang-word">{lang.language}</div>
                            </>
                        })}
                    </div>
                     {/* HEEEERE IS THEE TEEEXT AREAAAA */}

                    <textarea className={classTextArea} type="text" value={translateText} onChange={e => setTranslateText(e.target.value)}/>

                    <p className="number-of-words">{count}/500</p>

                    <div className="bottom-container">
                        <div onClick={()=>HearTheVoices()} className="copy-and-hear hear-translate"> {/*hear*/}
                            
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="hover-hear-translate" d="M3.46532 11.6089C2.87114 10.6186 2.87114 9.38143 3.46532 8.39114C3.64663 8.08895 3.94701 7.87726 4.29258 7.80815L5.70344 7.52598C5.78749 7.50917 5.86326 7.46409 5.91814 7.39824L7.17085 5.89498C8.3534 4.47592 8.94468 3.76638 9.47234 3.95742C10 4.14846 10 5.07207 10 6.91928L10 13.0807C10 14.9279 10 15.8515 9.47234 16.0426C8.94468 16.2336 8.3534 15.5241 7.17085 14.105L5.91814 12.6018C5.86326 12.5359 5.78749 12.4908 5.70344 12.474L4.29258 12.1918C3.94701 12.1227 3.64663 11.9111 3.46532 11.6089Z" fill="#4D5562"/>
                                <path className="hover-hear-translate-stroke" d="M12.1129 7.05373C12.8903 7.83111 13.329 8.88422 13.3333 9.9836C13.3376 11.083 12.9073 12.1395 12.1361 12.923" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
                                <path className="hover-hear-translate-stroke" d="M15.5474 5.28596C16.7912 6.52977 17.493 8.21475 17.4999 9.97375C17.5069 11.7327 16.8183 13.4232 15.5844 14.6768" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>

                        <div onClick={()=> CopyToClipboard()} className="copy-and-hear copy-translate"> {/*copy*/}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="hover-copy-translate" d="M11.6667 5.83334V5.83334C11.6667 5.36869 11.6667 5.13636 11.6282 4.94316C11.4704 4.14978 10.8502 3.52959 10.0569 3.37177C9.86366 3.33334 9.63133 3.33334 9.16668 3.33334H7.33334C5.44773 3.33334 4.50492 3.33334 3.91913 3.91913C3.33334 4.50492 3.33334 5.44773 3.33334 7.33335V9.16668C3.33334 9.63133 3.33334 9.86366 3.37177 10.0569C3.52959 10.8502 4.14978 11.4704 4.94316 11.6282C5.13636 11.6667 5.36869 11.6667 5.83334 11.6667V11.6667" stroke="#4D5562" stroke-width="2"/>
                                <rect className="hover-copy-translate" x="8.33334" y="8.33334" width="8.33333" height="8.33333" rx="2" stroke="#4D5562" stroke-width="2"/>
                            </svg>
                        </div>
                        <div className={copyClassTranslate}>Coppied to ClipBoard</div>
                        <div className={emptyCase}>There is no text</div>
                        <button onClick={()=> setClicked(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 20H18" stroke="#F9FAFB" stroke-width="2"/>
                                <path d="M9 12H15" stroke="#F9FAFB" stroke-width="2"/>
                                <path d="M7 17L10.1165 8.27376C10.9024 6.0734 11.2953 4.97321 12 4.97321C12.7047 4.97321 13.0976 6.07339 13.8835 8.27375L17 17" stroke="#F9FAFB" stroke-width="2"/>
                            </svg>
                            Translate
                        </button>
                    </div>
                </div>

                {/* SECOND BOX */}

                <div className="box translated">
                    <div className="languages">
                        <h4 onClick={()=>langWordActive(3)} className={langWord[3]}>{languagesTranslated[0].language}</h4>
                        <h4 onClick={()=>langWordActive(4)} className={langWord[4]}>{languagesTranslated[1].language}</h4>

                        <div className="spanish">
                            <h4 onClick={()=>langWordActive(5)} className={`${langWord[5]} lang-es`}>{languagesTranslated[2].language}</h4>
                            <svg onClick={toggleClassesTranslated} style={{cursor: "pointer"}} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6L8 10L4 6" stroke="#6C727F" stroke-width="2"/>
                            </svg>
                        </div>

                        <div onClick={reverseLanguages} className="copy-and-hear reverse"> {/* Reverse */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="hover-blue-reverse" d="M1.66666 6.66668L0.95955 5.95957L0.252443 6.66668L0.95955 7.37378L1.66666 6.66668ZM17.5 7.66668C18.0523 7.66668 18.5 7.21896 18.5 6.66668C18.5 6.11439 18.0523 5.66668 17.5 5.66668V7.66668ZM4.29288 2.62624L0.95955 5.95957L2.37376 7.37378L5.7071 4.04045L4.29288 2.62624ZM0.95955 7.37378L4.29288 10.7071L5.7071 9.2929L2.37376 5.95957L0.95955 7.37378ZM1.66666 7.66668H17.5V5.66668H1.66666V7.66668Z" fill="#4D5562"/>
                                <path className="hover-blue-reverse" d="M18.3333 13.3333L19.0404 12.6262L19.7475 13.3333L19.0404 14.0404L18.3333 13.3333ZM10.8333 14.3333C10.281 14.3333 9.83331 13.8856 9.83331 13.3333C9.83331 12.781 10.281 12.3333 10.8333 12.3333L10.8333 14.3333ZM15.7071 9.29289L19.0404 12.6262L17.6262 14.0404L14.2929 10.7071L15.7071 9.29289ZM19.0404 14.0404L15.7071 17.3738L14.2929 15.9596L17.6262 12.6262L19.0404 14.0404ZM18.3333 14.3333L10.8333 14.3333L10.8333 12.3333L18.3333 12.3333L18.3333 14.3333Z" fill="#4D5562"/>
                            </svg>
                        </div>

                    </div>
                    <div className="line"></div>
                    <div className="translated-div">
                        {translatedText}
                    </div>
                    <div className={classScrollTranslated}>

                        {languagesTranslated.map((lang, i) => {
                            return<>
                                <div key={i} onClick={ ()=>changePlaceTranslated(i)} className="lang-word">{lang.language}</div>
                            </>
                        })}

                    </div>
                    <div className="translated-text">
                        <p></p>
                    </div>

                    <div className="bottom-container bottom-translated">
                        <div onClick={()=> HearTheVoicesTranslated()} className="copy-and-hear hear-translated"> {/*hear*/}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="hover-hear-translated" d="M3.46532 11.6089C2.87114 10.6186 2.87114 9.38143 3.46532 8.39114C3.64663 8.08895 3.94701 7.87726 4.29258 7.80815L5.70344 7.52598C5.78749 7.50917 5.86326 7.46409 5.91814 7.39824L7.17085 5.89498C8.3534 4.47592 8.94468 3.76638 9.47234 3.95742C10 4.14846 10 5.07207 10 6.91928L10 13.0807C10 14.9279 10 15.8515 9.47234 16.0426C8.94468 16.2336 8.3534 15.5241 7.17085 14.105L5.91814 12.6018C5.86326 12.5359 5.78749 12.4908 5.70344 12.474L4.29258 12.1918C3.94701 12.1227 3.64663 11.9111 3.46532 11.6089Z" fill="#4D5562"/>
                                <path className="hover-hear-translated-stroke" d="M12.1129 7.05373C12.8903 7.83111 13.329 8.88422 13.3333 9.9836C13.3376 11.083 12.9073 12.1395 12.1361 12.923" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
                                <path className="hover-hear-translated-stroke" d="M15.5474 5.28596C16.7912 6.52977 17.493 8.21475 17.4999 9.97375C17.5069 11.7327 16.8183 13.4232 15.5844 14.6768" stroke="#4D5562" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <div onClick={()=> CopyToClipboardTranslated()} className="copy-and-hear copy-translated"> {/*copy*/}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="hover-copy-translated" d="M11.6667 5.83334V5.83334C11.6667 5.36869 11.6667 5.13636 11.6282 4.94316C11.4704 4.14978 10.8502 3.52959 10.0569 3.37177C9.86366 3.33334 9.63133 3.33334 9.16668 3.33334H7.33334C5.44773 3.33334 4.50492 3.33334 3.91913 3.91913C3.33334 4.50492 3.33334 5.44773 3.33334 7.33335V9.16668C3.33334 9.63133 3.33334 9.86366 3.37177 10.0569C3.52959 10.8502 4.14978 11.4704 4.94316 11.6282C5.13636 11.6667 5.36869 11.6667 5.83334 11.6667V11.6667" stroke="#4D5562" stroke-width="2"/>
                                <rect className="hover-copy-translated" x="8.33334" y="8.33334" width="8.33333" height="8.33333" rx="2" stroke="#4D5562" stroke-width="2"/>
                            </svg>
                        </div>
                        <div className={copyClassTranslated}>Coppied to ClipBoard</div>
                        <div className={emptyCaseTranslated}>There is no text</div>
                    </div>
                    
                </div>
            </div>
        </div>
        <a className="a" href="mailto:kaoucheaneslive@gmail.com">Send Feedback</a>
        <a className="rep" href="https://github.com/KMalek101/translator-app">Repository</a>
    </>
}
export default Page