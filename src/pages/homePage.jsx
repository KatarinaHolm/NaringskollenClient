import SearchAutoComplete from "../atoms/searchAutoComplete";

export default function HomePage(){ 
    const testArray =  [{ id: 1, name: 'Test 1', category:'Grönsaker, potatis & rotfrukter' }, { id: 1, name: 'Test 1', category:'Grönsaker, potatis & rotfrukter' }, { id: 1, name: 'Test 1', category:'Grönsaker, potatis & rotfrukter' }, { id: 1, name: 'Test 1', category:'Grönsaker, potatis & rotfrukter' },{ id: 1, name: 'Test 1', category:'Grönsaker, potatis & rotfrukter' },{ id: 2, name: 'Test 2 bla bla bla bla bla bla bla bla test test test', category:'Grönsaker, potatis & rotfrukter'}, { id: 3, name: 'Kyckling rå med skinn', category:'Kött, fågel & chark' }, { id: 1, name: 'Majonnäs 80 % fett', category: 'Färdiga rätter, såser & snabbmat'}, { id: 1, name: 'Test 1' }, { id: 1, name: 'Test 1', category: 'Färdiga rätter, såser & snabbmat' }, { id: 1, name: 'Test 1', category: 'Färdiga rätter, såser & snabbmat' }, ]

    return(
        <>
        <SearchAutoComplete 
        
         results = {testArray}
       
         />
        <p>Under utveckling...</p>
        </>
    )
}

//  value=
        //  onChange= 
         //  onSelect=