export class PriorityQueue {
    constructor() {
        this.values = [];
    }
    
    push(stationId, priority1, line, route, priority2 = Infinity) {
        var flag = false;
        for (let i = 0; i < this.values.length; i++) {
            if (this.compare({priority1, priority2}, this.values[i]) < 0) {
                this.values.splice(i, 0, {stationId, priority1, priority2, line, route});
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.values.push({stationId, priority1, priority2, line, route});
        }
    }
    
    compare(a, b) {
        if (a.priority1 < b.priority1) return -1;
        if (a.priority1 > b.priority1) return 1;
        
        if (a.priority2 < b.priority2) return -1;
        if (a.priority2 > b.priority2) return 1;
        
        return 0; 
    }
    
    pop() {
        return this.values.shift();
    }
    
    size() {
        return this.values.length;
    }

    top() {
        return this.values[0];
    }
}