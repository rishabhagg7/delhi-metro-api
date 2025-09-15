export class PriorityQueue{
    constructor(){
        this.values = [];
    }
    
    push(stationId, priority, line, route){
        var flag = false;
        for(let i=0; i<this.values.length; i++){
            if(this.values[i].priority>priority){
                this.values.splice(i, 0, {stationId, priority, line, route})
                flag = true;
                break;
            }
        }
        if(!flag){
            this.values.push({stationId, priority, line, route})
        }
    }
    
    pop(){
        return this.values.shift()
    }
    
    size(){
        return this.values.length;
    }

    top(){
        return this.values[0]
    }
}