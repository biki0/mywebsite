import { useState } from "react";
import Heading from "../Heading";
import "./fp.css"

const FixedPoint = () => {

    // let t_bits = the total number of bits of the fixed point value
    // let b_bits = number of bits after the decimal point of the fixed point value

    const [fixed_point_val, set_fp_value] = useState<string>("");
    const [total_bits, set_total_bits] = useState<string>("");
    const [bits_after_dec, set_bits_after_dec] = useState<string>("");

    let binary_value: string = "";
    let hex_value: string = "";

    const handle_fp_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_fp_value(event.target.value);
    }
    
    const handle_t_bit_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_total_bits(event.target.value);
    }

    const handle_b_bit_value = (event: React.ChangeEvent<HTMLInputElement>) => {
        set_bits_after_dec(event.target.value);
    }

    const integer_to_binary = (num: string, bit_amount: number) => {
        return parseInt(num, 10).toString(2).padStart(bit_amount, "0");
    }
    
    const binary_to_hex = (bin_val: string) => {
        return parseInt(bin_val, 2).toString(16);
    }

    //splits binary value starting from right to left into sections of 4 bits 
    //ex. {01010010 = [0101, 0010] = 0x52} (4bits = 1hex digit)
    const binary_sections_to_hex = (bin_val: string) => {       
        
        let dec_bin_split: Array<string> = bin_val.split("");
        let dec_bin_arr: Array<string> = [];

        while(dec_bin_split.length) {
            dec_bin_arr.unshift(dec_bin_split.splice(-4).join(""));
        }

        let hex_val: string = "";

        for(let i: number = 0; i < dec_bin_arr.length; ++i) {
            hex_val = hex_val + binary_to_hex(dec_bin_arr[i]).toUpperCase();
        }

        return "0x" + hex_val;

    }

    const fractions_to_binary = (fraction_val: number, total_frac_bits: number) => {

        let binary_val: string = "";

        for(let i: number = 0; i < total_frac_bits; ++i) {

            if(!Number.isInteger(fraction_val)) {
                fraction_val = fraction_val * 2;

                if((fraction_val - 1) >= 0) {
                
                    fraction_val = fraction_val - 1;
                    binary_val = binary_val + "1";
                
                }
                else {
                    binary_val = binary_val + "0";
                }
            }
            else {
                binary_val = binary_val + "0";
            }

        }

        return binary_val;

    }

    const binary_twos_complement = (bin_val: string) => {

        let bin_val_invert: string = bin_val.split('').map(x => x === "0" ? "1" : "0").join('');
        let twos_comp: bigint = ((BigInt('0b' + bin_val_invert) + BigInt('0b' + 1)));
        
        return twos_comp;

    }

    const fixed_point_conversion = (fp_val: number, t_bits: number, b_bits: number, is_twos_complement: boolean) : [bin_val: string, hex_val: string] => {

        let bits_before_dec:number = t_bits - b_bits;
        let bin_val: string = "";
        let hex_val: string = "";
        let int_part: number = Math.floor(fp_val);
        let dec_part: number = fp_val - int_part;


        if(Number.isInteger(fp_val)) {
            bin_val = integer_to_binary(fp_val.toString(), bits_before_dec) + "0".repeat(b_bits);
        }
        else {

            let frac_bin: string = fractions_to_binary(dec_part, b_bits);
            let whole_num_bin: string = integer_to_binary(int_part.toString(), bits_before_dec);
            bin_val = (t_bits - b_bits == 0) ? frac_bin : whole_num_bin + frac_bin;

        }

        if(is_twos_complement){
            bin_val = binary_twos_complement(bin_val).toString(2);
        }
        
        hex_val = binary_sections_to_hex(bin_val);
        bin_val = bin_val.slice(0, bits_before_dec) + "." + bin_val.slice(bits_before_dec);

        

        return [bin_val, hex_val];

    }


    if(fixed_point_val.length > 0 && total_bits.length > 0 && bits_after_dec.length > 0) {

        let fp_value: number;
        let t_bits: number = Number(total_bits);
        let b_bits: number = Number(bits_after_dec);
        let is_twos_complement: boolean;

        if(fixed_point_val[0] == "-"){

            fp_value = Number(fixed_point_val.replace("-", ""));
            is_twos_complement = true;

        }
        else {

            fp_value = Number(fixed_point_val);
            is_twos_complement = false;

        }

        [binary_value, hex_value] = fixed_point_conversion(fp_value, t_bits, b_bits, is_twos_complement);

        //0.26953125 <24,16> = 0x004500
        //0.0019989013671875 <16,16> = 0x0083

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
                    <h2><b>Binary: { binary_value } </b></h2>
                </div>
            </div>

            <div className="card">
                <div className="container">
                    <h2><b>Hexadecimal: { hex_value }</b></h2>
                </div>
            </div>

            <div className="input-boxes">
                <h2> Fixed Point Value</h2>
                <input className="fp-val" type="text" placeholder="enter here" value={ fixed_point_val } onChange={ handle_fp_value } />
            </div>
        
            <div className="input-boxes">
                <h2> Total Number of Bits</h2>
                <input className="bit-val" type="text" placeholder="enter here" value={ total_bits } onChange={ handle_t_bit_value } />
            </div>

            <div className="input-boxes">
                <h2> Number of Bits After Decimal Point</h2>
                <input className="dpoint-val" type="text" placeholder="enter here" value={ bits_after_dec } onChange={ handle_b_bit_value } />
            </div>

        </>

    )

}

export default FixedPoint;