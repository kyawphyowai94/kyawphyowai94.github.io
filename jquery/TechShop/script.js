$(document).ready(function(){
    
    count();
    getData();
    $('.addToCart').click(function(){
        //alert("hello");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');

        //console.log(id,name,price);
        let items = {
            id: id,
            name: name,
            price: price,
            qty: 1,
            amount: 0
        }
        console.log(items);
        


        let itemsString = localStorage.getItem('shops');
        let itemsArray;

        if(itemsString == null){
            itemsArray = [];
        }else {
            itemsArray = JSON.parse(itemsString);
        }


        let status = false;
        $.each(itemsArray, function(i,v){
            if(v.id == id){
                v.qty++;
                status = true;
            }
        })

        if(status == false){
            itemsArray.push(items);
        }
        
        let itemsData = JSON.stringify(itemsArray);
        localStorage.setItem('shops',itemsData);

        count();
    })


    function getData(){
            let itemsString = localStorage.getItem('shops');
            if(itemsString){
               let itemsArray = JSON.parse(itemsString);

                let itemData = '';
                let j = 1;
                let total = 0;
                $.each(itemsArray, function(i,v){
                    itemData += `<tr>
                                <td>${j++}</td>
                                <td>${v.name}</td>
                                <td>${v.price}</td>
                                <td>
                                    <button class="min" data-key="${i}">-</button>
                                    ${v.qty}
                                    <button class="max" data-key="${i}">+</button>
                                </td>
                                <td>${v.price * v.qty}</td>
                             </tr>`;
                        total += (v.price * v.qty);
                })
                    itemData += `<tr>
                                    <td colspan="4">Total</td>
                                    <td>${total}</td>
                                </tr>`;

                $('#tbody').html(itemData);
            }
    }

    function count(){
        let itemsString = localStorage.getItem('shops');
        if(itemsString) {
            let itemsArray = JSON.parse(itemsString);
            if(itemsArray != null){
                let count =itemsArray.length;
                $('#count_item').text(count);
            }
        }
    }

    $('#tbody').on('click','.min',function(){
        let key = $(this).data('key');

        let itemsString = localStorage.getItem('shops');
        if(itemsString){
            let itemsArray = JSON.parse(itemsString);

            $.each(itemsArray,function(i,v){
                if(i == key){
                    v.qty--;
                    if(v.qty == 0){
                        itemsArray.splice(key,1);
                    }
                }
            });

            let itemsData = JSON.stringify(itemsArray);
            localStorage.setItem('shops',itemsData);

            getData();
            count();
        }
    })

    $('#tbody').on('click','.max',function(){
        let key = $(this).data('key');

        let itemsString = localStorage.getItem('shops');
        if(itemsString){
            let itemsArray = JSON.parse(itemsString);

            $.each(itemsArray,function(i,v){
                if(i == key){
                    v.qty++;
                }
            });

            let itemsData = JSON.stringify(itemsArray);
            localStorage.setItem('shops',itemsData);

            getData();
        }
    })

    $('#order_now').click(function(){
        let ans = confirm('Are you sure order?');

        if(ans){
            localStorage.removeItem('shops');
            window.location.href = 'index.html';
        }
    })
})