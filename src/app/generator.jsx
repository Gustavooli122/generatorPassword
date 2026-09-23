"use client";
import Slider from "./components/slider";
import { useState } from "react";
import { Files } from "lucide-react";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
export default function PassGerenator(){
    const [password,setPassword] = useState("");
    const [passLength,setPassLength]= useState(10);
    const [copied, setCopied] = useState(false);

    const [options, setOptions] = useState(
        {upper:true, lower:true, numbers:true, symbol:true}
    );
    function optionsButtons(value){
       

       if(value === "upper"){
           let valuer = options.upper?options.upper=false:options.upper=true
            setOptions({...options,upper:valuer})
       }
       if(value === "lower"){
          let valuer = options.lower?options.lower=false:options.lower=true
            setOptions({...options,lower:valuer})
       }
       if(value === "numbers"){
       let valuer = options.numbers?options.numbers=false:options.numbers=true
            setOptions({...options,numbers:valuer})
       }
       if(value === "symbol"){
         let valuer = options.symbol?options.symbol=false:options.symbol=true
            setOptions({...options,symbol:valuer})
       }
       else{
        console.log(options)
       }
    }
    function gerenatePassword(){
       let chars = "";
        if(options.lower) chars += "abcdefghijklmnopqrstuvwxyz";
        if(options.upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(options.numbers) chars += "0123456789";
        if(options.symbol) chars += "!@#$%&*";

       let pass = "";
      for(let i = 0; i < passLength; i++) {
         pass += chars[Math.floor(Math.random() * chars.length)];
       } 
       setPassword(pass)
       setPassLength(pass.length)
       console.log(pass)
     
    }
    const handleCopy = async ()=>{
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(()=>{setCopied(false)},2000)
        console.log("funçao funcionando")
    }
    return(
        <main className="m-auto w-full sm:w-[80%] md:w-[60%]  lg:w-[50%] space-y-4">
            <h1 className="text-center">Gerador de senhas</h1>
            <div onClick={()=> handleCopy()} className="flex justify-between items-center p-4 bg-[#24232b]"><p className="text-lg  text-white font-semibold">Copiar</p><span className="text-white m-3 whitespace-nowrap overflow-x-auto  no-scrollbar">{password}</span><Files onClick={()=> handleCopy} className="text-white"/></div>
            <section className="text-gray-300 flex flex-col gap-5 p-6 bg-[#24232b]">
                <div className="flex justify-between"><p>Tamanho da senha</p> <span className="text-2xl font-semibold text-[#a4ffaf] ">{passLength}</span></div>
                <Slider setValue={setPassLength} value={passLength}/>
             <ul className="flex flex-col gap-2">
                <li className="flex gap-3" onClick={()=> optionsButtons("lower")}><span className={`items-center w-6 h-6 border border-blue-50 gap-2 ${options.lower?"bg-[#a4ffaf]":"bg-[#24232b]"}`}>{options.lower && <Check className="m-auto w-5 text-[#131219] font-semibold"/>}</span>Adicionar letras minúsculas</li>
                <li className="flex gap-3" onClick={()=> optionsButtons("upper")}><span className={`w-6 h-6 border border-blue-50 gap-2 ${options.upper?"bg-[#a4ffaf]":"bg-[#24232b]"}`}>{options.upper && <Check className="m-auto w-5 text-[#131219] font-semibold"/>}</span>Adicionar letras maiúsculas</li>
                <li className="flex gap-3" onClick={()=> optionsButtons("symbol")}><span className={`w-6 h-6 border border-blue-50 gap-2 ${options.symbol?"bg-[#a4ffaf]":"bg-[#24232b]"}`}>{options.symbol && <Check className="m-auto w-5 text-[#131219] font-semibold"/>}</span>Adicionar símbolos</li>
                <li onClick={()=> optionsButtons("numbers")} className="flex gap-3"><span className={`w-6 h-6 border border-blue-50 gap-2 ${options.numbers?"bg-[#a4ffaf]":"bg-[#24232b]"}`}>{options.numbers && <Check className="m-auto w-5 text-[#131219] font-semibold"/>}</span>Adicionar numeros</li>
             </ul>
             <button className="bg-[#a4ffaf]  flex items-center w-full p-2 text-[#141c1e] " onClick={()=> gerenatePassword()}> <div className="m-auto flex gap-2 items-center justify-center text-xl font-semibold">Gerar senha <ArrowRight/></div></button>
            </section>
          
        </main>
    )
}