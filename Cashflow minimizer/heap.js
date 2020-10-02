/* Vishwas Tak */
export { BinaryHeap }

class BinaryHeap{

    constructor(){
        this.heap = [];
    }
    size(){
        return this.heap.length;
    }
    insert(value){
        this.heap.push(value);
        this.bubbleUp();
    }
    empty(){
        if (this.size()===0)
        return true;
        else return false;
    }
    bubbleUp(){
    let index=this.size()-1;
        while(index!==0){
           let parentIndex = Math.floor((index-1)/2);
           let parent = this.heap[parentIndex];
            
            if(parent[0]>=this.heap[index][0])
            break;

           
            this.heap[parentIndex]=this.heap[index];
            this.heap[index]=parent;
            index=parentIndex;
        }
    }
    extractMax(){
        const top=this.heap[0];
        const min=this.heap.pop();
        if(!this.empty()){
            this.heap[0]=min;
            this.heapify(0);
        }
        return top;
    }
    heapify(index){
        let left = 2*index+1;
        let right = 2*index+2;
        let largest=index;
        if(left<this.size() && this.heap[left][0]>this.heap[largest][0])
        largest=left;
        if(right<this.size() && this.heap[right][0]>this.heap[largest][0])
        largest=right;
        
        if(largest!==index){
            let temp=this.heap[index];
            this.heap[index]=this.heap[largest];
            this.heap[largest]=temp;
            this.heapify(largest);

        }
    }

}