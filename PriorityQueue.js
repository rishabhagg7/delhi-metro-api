export class PriorityQueue {
    constructor(){
        this.values = []
    }

    heapifyUp(child){
        if(child === 0) return
        const parent = Math.floor((child-1)/2);
        if(parent >= 0 && this.compare(this.values[parent], this.values[child]) > 0){
            this.swap(this.values, parent, child)
            this.heapifyUp(parent)
        }
    }

    heapifyDown(parentIndex){
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

        if(minimumIndex !== parentIndex){
            this.swap(this.values, parentIndex, minimumIndex)
            this.heapifyDown(minimumIndex)
        }
    }

    push(stationId, line, route, priority1, priority2 = Infinity){
        this.values.push({stationId,line,route,priority1,priority2});
        this.heapifyUp(this.values.length-1)
    }

    pop(){
        if (this.values.length === 0) return undefined;
        if (this.values.length === 1) return this.values.pop();
        const val = this.values[0]
        this.swap(this.values, 0, this.values.length-1)
        this.values.pop()
        this.heapifyDown(0)
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