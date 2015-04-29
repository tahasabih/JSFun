//O(n) algo to sort odd and even numbers with O(1) space complexity

var numbers = [7,7,4,0,9,8,2,4,1,9];
console.log('start', numbers);


sortArray(numbers);
function sortArray(inputArray)
{
    lastSwap = inputArray.length-1;
    index = 0;
    const oddBit = 1;

    while(index<lastSwap)
    {
        if ((inputArray[index] & oddBit) == 1)
        {
            var temp = inputArray[lastSwap];
            inputArray[lastSwap] = inputArray[index];
            inputArray[index] = temp;
            lastSwap--;
        }
        else
        {
            index++;
        }
    }

}
console.log(numbers)