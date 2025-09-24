class PQ{
    constructor(){
        this.values = []
    }

    heapifyUp(){
        for (let parentIndex = (Math.floor(this.values.length/2)-1); parentIndex >= 0; parentIndex--) {
            const parent = this.values[parentIndex];
            const leftChildIndex = 2*parentIndex+1
            const rightChildIndex = 2*parentIndex+2
            let minimumIndex = parentIndex
            let minimumValue = parent.priority

            if(rightChildIndex < this.values.length){
                const rightChild = this.values[rightChildIndex]
                if(minimumValue > rightChild.priority){
                    minimumValue = rightChild.priority
                    minimumIndex = rightChildIndex
                }
            }

            if(leftChildIndex < this.values.length){
                const leftChild = this.values[leftChildIndex]
                if(minimumValue > leftChild.priority){
                    minimumValue = leftChild.priority
                    minimumIndex = leftChildIndex
                }
            }

            this.swap(this.values, parentIndex, minimumIndex)

            if(minimumIndex === parentIndex){
                break
            }
        }
    }

    heapifyDown(){
        for (let parentIndex = 0; parentIndex < Math.floor((this.values.length/2)); parentIndex++) {
            const parent = this.values[parentIndex];
            const leftChildIndex = 2*parentIndex+1
            const rightChildIndex = 2*parentIndex+2
            let minimumIndex = parentIndex
            let minimumValue = parent.priority

            if(rightChildIndex < this.values.length){
                const rightChild = this.values[rightChildIndex]
                if(minimumValue > rightChild.priority){
                    minimumValue = rightChild.priority
                    minimumIndex = rightChildIndex
                }
            }

            if(leftChildIndex < this.values.length){
                const leftChild = this.values[leftChildIndex]
                if(minimumValue > leftChild.priority){
                    minimumValue = leftChild.priority
                    minimumIndex = leftChildIndex
                }
            }

            this.swap(this.values, parentIndex, minimumIndex)

            if(minimumIndex === parentIndex){
                break
            }
        }
    }

    push(stationId, line, route, priority){
        this.values.push({stationId,line,route,priority});
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
}