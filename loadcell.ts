/**
* Makecode block for digital weighing scale
*/

namespace SGBotic {

    let pinDTSel: DigitalPin
    let pinSCKSel: DigitalPin
    let noloadValue = 0
    let offSet = 0
    let constant = 0
    let constant10kg = 447
    let constant5kg = 236
    
    

    /**
    * Define pins that connect to load cell converter
    */
    //% subcategory=scale  color=#66B2FF 
    //% blockId="LoadCell_init" block="set scale pins| SCK %pinSCK| DT %pinDT"
    //% weight=100 color=#66B2FF blockExternalInputs=true blockGap=8
    export function init_loadcell(pinSCK: DigitalPin, pinDT: DigitalPin): void {
      
        pinDTSel = pinDT
        pinSCKSel = pinSCK
        constant = constant5kg
    }
    
    /**
    * Read loadcell with no load
    */
    //% subcategory=scale
    //% blockId="LoadCell_noLoad" block="read scale with no load"
    //% weight=90 color=#66B2FF  blockExternalInputs=true blockGap=8
    export function loadCell_noLoad(): void {
      
        noloadValue = getCountAverage()
    }
    
    
    
    /**
    * Read sensor value in grams
    */
    //% subcategory=scale
    //% blockId="LoadCell_ReadGrams" block="read scale in grams"
    //% weight=80 color=#66B2FF  blockExternalInputs=true blockGap=8
    export function read_grams(): number {
      
        let sensorValue = 0;
        
        sensorValue = getCountAverage()
        sensorValue = sensorValue - noloadValue
       sensorValue = constant * sensorValue
        sensorValue = sensorValue / 100000
        
        if (sensorValue < 0)
            sensorValue = 0
        
        return Math.round(sensorValue);
    }
    
   
    /**
    * Calibrate loadcell with 1kg load
    */
    //% subcategory=scale
    //% blockId="LoadCell_cali1kg" block="calibrate with 1kg load"
    //% weight=80 color=#66B2FF  blockExternalInputs=true blockGap=8
    export function cali_1kg(): void {
      
        let sensorValue = 0;
        
        sensorValue = getCountAverage()
        sensorValue = sensorValue - noloadValue
        
        constant = 100000000/sensorValue
    }
    
    /**
    * Calibrate loadcell with user defined load
    */
    //% subcategory=scale
    //% blockId="LoadCell_caliUserLoad" block="calibrate with %userLoad|g load"
    //% weight=80 color=#66B2FF blockGap=8
    export function cali_UserLoad(userLoad: number): void {
      
        let sensorValue = 0;
        let puserLoad = userLoad
        
        sensorValue = getCountAverage()
        sensorValue = sensorValue - noloadValue
        
        constant = (puserLoad * 100000)/sensorValue

    }
    

    
   export function getCountAverage():number{
        let j = 0
        let countTotal = 0
        
        for (j=0; j<16; j++){
            countTotal = countTotal + getCount()
        
        }
        
        return (countTotal >> 4)
   
   } 
    
   
   export function getCount():number{
    
        let i = 0
        let count = 0
        
        pins.digitalWritePin(pinSCKSel, 0)
        count = 0
        
        while (pins.digitalReadPin(pinDTSel) == 1) {

        }
        
        for (i=0; i<24; i++){
            pins.digitalWritePin(pinSCKSel, 1)
            count = count  << 1
            pins.digitalWritePin(pinSCKSel, 0)
            if (pins.digitalReadPin(pinDTSel) == 1) {
                count = count + 1
            }
        }
        pins.digitalWritePin(pinSCKSel, 1)
        count = count ^ 0x800000
        pins.digitalWritePin(pinSCKSel, 0)
        return count
   }
   
   

}