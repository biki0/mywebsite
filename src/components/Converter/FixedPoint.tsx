import { useState } from "react";
import Heading from "../Heading";
import "./fp.css"

const FixedPoint = () => {

    // let t_bits = the total number of bits of the fixed point value
    // let b_bits = number of bits after the decimal point of the fixed point value

    const [fixed_point_val, set_fp_value] = useState<string>("");
    const [t_bits, set_t_bits] = useState<string>("");
    const [b_bits, set_b_bits] = useState<string>("");

    let binary_val : string = "0";
    let hex_val : string = "0";

    const handle_fp_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_fp_value(event.target.value);
    }
    
    const handle_t_bit_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_t_bits(event.target.value);
    }

    const handle_b_bit_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_b_bits(event.target.value);
    }

    const integer_to_binary = (num: string, bit_amount: number, pad_end: boolean) => {
        let temp:string = parseInt(num, 10).toString(2)
        return (pad_end) ? temp.padEnd(bit_amount, "0") : temp.padStart(bit_amount, "0");
    }

    const binary_to_hex = (bin_val: string) => {
        return parseInt(bin_val, 2).toString(16);
    }

    const fixed_point_to_hex_bin = () => {

        let fp: number = Number(fixed_point_val);
        let t_b = Number(t_bits);
        let b_b = Number(b_bits);
        let bits_before_dec: number = t_b - b_b;
        
        
        if(Number.isInteger(fp)){

            binary_val = integer_to_binary(fixed_point_val, bits_before_dec, true);
            console.log(binary_val)
            hex_val = "0x" + binary_to_hex(binary_val).toUpperCase();
            binary_val = binary_val + "." + "0".repeat(b_b);
        
        }
        else {

            let int_part:number = Math.floor(fp);
            let dec_part:number = fp - int_part;
            let int_bin: string = integer_to_binary(int_part.toString(), bits_before_dec, false);
            let dec_bin: string = "";
            
            let temp_b_bits: number = dec_part;
   
            for(let i=0; i<b_b; ++i) {
                
                if(!Number.isInteger(temp_b_bits)){
       
                    temp_b_bits = temp_b_bits * 2;

                    if((temp_b_bits - 1) >= 0){

                        temp_b_bits = temp_b_bits - 1;
                        dec_bin = dec_bin + "1";

                    }
                    else{
                        
                        dec_bin = dec_bin + "0";

                    }
                    
                }
                else{
                    
                    dec_bin = dec_bin + "0".repeat(b_b - i);
                    break

                }

            }

            let new_dec_bin: string = (t_b - b_b  == 0) ? dec_bin : int_bin + dec_bin;          
            let dec_bin_split = new_dec_bin.split("");
            let dec_bin_arr: Array<string> = [];

            while(dec_bin_split.length){

                dec_bin_arr.unshift(dec_bin_split.splice(-4).join(""));

            }

            let h:string = "";
            for(let i=0; i<dec_bin_arr.length; ++i){

                h = h + binary_to_hex(dec_bin_arr[i]).toUpperCase();

            }
            
            //.26953125 <24,16>
            //0.0019989013671875 <16,16>

            hex_val = "0x" + h;
            binary_val = (t_b - b_b == 0) ?  " "+ "." + dec_bin : int_bin + "." + dec_bin;

        }

    }


    if(fixed_point_val.length > 0 || t_bits.length > 0 || b_bits.length > 0) {
        
        fixed_point_to_hex_bin();
    
    }


    return (

        <>
        
            <Heading title="Fixed Point to Binary and Hex" />

            <div className="card">
                
                <div className="container">
                    <h2><b>Example</b></h2>
                    <h3> Let t = total number of bits and b = number of bits after decimal point [t, b]  </h3>
                    <h3> If [t, b] = [16, 14] then its fixed point representation is 00.00000000000000 </h3>
                    <h3> If [t, b] = [16, 2] then its fixed point representation is 00000000000000.00 </h3>
                    <h3> If [t, b] = [24, 16] then its fixed point representation is 00000000.0000000000000000 </h3>
                </div>
            </div>

            <div className="card">
                <div className="container">
                    <h2><b>Binary: { binary_val } </b></h2>
                </div>
            </div>

            <div className="card">
                <div className="container">
                    <h2><b>Hexadecimal: { hex_val }</b></h2>
                </div>
            </div>

            <div className="input-boxes">
                <h2> Fixed Point Value</h2>
                <input className="fp-val" type="text" placeholder="ex: 0.0625" value={ fixed_point_val } onChange={ handle_fp_value } />

            </div>
        
            <div className="input-boxes">
                <h2> Total Number of Bits</h2>
                <input className="bit-val" type="text" placeholder="ex: 16" value={ t_bits } onChange={ handle_t_bit_value } />

            </div>

            <div className="input-boxes">
                <h2> Number of Bits After Decimal Point</h2>
                <input className="dpoint-val" type="text" placeholder="ex: 14" value={ b_bits } onChange={ handle_b_bit_value } />

            </div>

        </>

    )

}

export default FixedPoint;
