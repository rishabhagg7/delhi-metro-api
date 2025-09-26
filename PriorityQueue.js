export class PriorityQueue {
    constructor(){
        this.values = []
    }

    heapify(parentIndex){
        const parent = this.values[parentIndex];
        const leftChildIndex = 2*parentIndex+1
        const rightChildIndex = 2*parentIndex+2
        let minimumIndex = parentIndex
        let minimumNode = parent

        if(rightChildIndex < this.values.length){
            const rightChild = this.values[rightChildIndex]
            if(this.compare(minimumNode, rightChild) > 0){
                minimumNode = rightChild
                minimumIndex = rightChildIndex
            }
        }

        if(leftChildIndex < this.values.length){
            const leftChild = this.values[leftChildIndex]
            if(this.compare(minimumNode, leftChild) > 0){
                minimumNode = leftChild
                minimumIndex = leftChildIndex
            }
        }

        this.swap(this.values, parentIndex, minimumIndex)

        return minimumIndex !== parentIndex
    }

    heapifyUp(){
        for (let parentIndex = (Math.floor(this.values.length/2)-1); parentIndex >= 0; parentIndex--) {
            if(!this.heapify(parentIndex)){
                break;
            }
        }
    }

    heapifyDown(){
        for (let parentIndex = 0; parentIndex < Math.floor((this.values.length/2)); parentIndex++) {
            if(!this.heapify(parentIndex)){
                break;
            }
        }
    }

    push(stationId, line, route, priority1, priority2 = Infinity){
        this.values.push({stationId,line,route,priority1,priority2});
        this.heapifyUp()
    }

    pop(){
        const val = this.values[0]
        this.swap(this.values, 0, this.values.length-1)
        this.values.pop()
        this.heapifyDown()
        return val
    }

    top(){
        return this.values[0]
    }

    size() {
        return this.values.length;
    }

    swap(arr, idx1, idx2){
        [arr[idx1],arr[idx2]] = [arr[idx2],arr[idx1]];
        return arr
    }

    compare(a, b) {
        if (a.priority1 < b.priority1) return -1;
        if (a.priority1 > b.priority1) return 1;
        
        if (a.priority2 < b.priority2) return -1;
        if (a.priority2 > b.priority2) return 1;
        
        return 0; 
    }
}