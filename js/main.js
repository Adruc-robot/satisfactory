let hoverObject = ''
const thePath = 'txt/Docs.JSON'
let reciSort = []
//testing
const dig = (obj, target) =>
target in obj
  ? obj[target]
  : Object.values(obj).reduce((acc, val) => {
    //console.log(acc)
      if (acc !== undefined) return acc;
      if (typeof val === 'object') return dig(val, target);
    }, undefined);
let doot = {}
let domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
}

domReady(function() {
    main()    
    

})
let newThing = []
let mainArr = []

function findThingsInDoot() {
    let searchTerm = document.getElementById('finderID').value
    let NativeClasses = []
    //console.log(searchTerm)
    for (let i = 0; i < doot.length; i++) {
        for (let ii = 0; ii < doot[i].Classes.length; ii++) {
            if (doot[i].Classes[ii].mDisplayName) {
                if (doot[i].Classes[ii].mDisplayName.toLowerCase() == searchTerm.toLowerCase()) {
                    //trip.push(doot[i].Classes[ii])
                    NativeClasses.push( { NativeClass: doot[i].NativeClass, DisplayName: doot[i].Classes[ii].mDisplayName })
                }
            }
        }
        //console.log(doot[i].Classes.length)

    }
    //console.log(trip)
    //console.log(NativeClasses)
    let classString = ''
    NativeClasses.forEach(item => {
        classString = classString + `${item.DisplayName}|${item.NativeClass}<br>`
    })
    document.querySelectorAll('.toDoList')[0].innerHTML = classString
}
async function main() {
    doot = await getThings(thePath)
    //console.log('doot')
    //console.log(doot)
    for (let one in doot) {
        if (typeof doot[one] == "object") {
            for (let two in doot[one]) {
                if (typeof doot[one][two] == 'object') {
                    for (let three in doot[one][two]) {
                        if (typeof doot[one][two][three] == 'object') {
                            let linkage = doot[one][two][three].ClassName.split('_')[1]
                            //if (doot[one][two][three].mDisplayName) {

                                //let linkage = doot[one][two][three].mDisplayName.replace(' ','').replace('.','').replace('™','')

                                if (doot[one][two][three].mDisplayName == 'Iron Ingot') {
                                    linkage = 'IronIngot'
                                }
                                if (!newThing[linkage]) {
                                    //initialize the entry
                                    newThing[linkage] = []
                                }
                                //Set up the name that'll display on the  
                                if (doot[one][two][three].mDisplayName && !newThing[linkage].DisplayName) {
                                    newThing[linkage].DisplayName = doot[one][two][three].mDisplayName
                                }
                                if (!doot[one][two][three].mDisplayName) {
                                    if (!newThing['nomDisplayName']) {
                                        newThing['nomDisplayName'] = []
                                    }
                                    linkage = 'nomDisplayName'
                                }
                                //Set up the path of the image
                                if (doot[one][two][three].mSmallIcon && !newThing[linkage].imgLink) {
                                    let fullImgLink = doot[one][two][three].mSmallIcon
                                    newThing[linkage].imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                                }
                                if (doot[one][two][three].mIngredients && !newThing[linkage].recipe) {
                                    
                                    //newThing[linkage].recipe = doot[one][two][three].mIngredients
                                    let ingList = []
                                    doot[one][two][three].mIngredients.replace('((','').replace('))','').split('),(').forEach(item => {
                                        ingList.push({"name": item.split(',')[0].split('.')[1].split('_')[1], "amount":item.split(',')[1].split('=')[1]})
                                    })
                                    newThing[linkage].recipe = ingList
                                    newThing[linkage].mIngredients = doot[one][two][three].mIngredients
    
                                }
                                //Push it to the array
                                newThing[linkage].push([{'objType' : doot[one][two][three].ClassName.split('_')[0], 'data': [ doot[one][two][three] ] }])
                            //}
                            let mDisplayName = doot[one][two][three].mDisplayName
                            let fullImgLink = doot[one][two][three].mSmallIcon
                            let mIngredients = doot[one][two][three].mIngredients
                            let classLinkArr = doot[one][two][three].ClassName.split('_')
                            let classLink = ''
                            for (cl = 1; cl < classLinkArr.length - 1; cl++) {
                                if (cl !== classLinkArr.length - 1) {
                                    classLink += `${classLinkArr[cl]}_`
                                } else {
                                    classLink += classLinkArr[cl]
                                }
                                
                            }
                            let classData = doot[one][two][three]
                            //need to locate the index for the item - this is done by using the DisplayName or ClassLink - ClassLink only when there is no mDisplayName
                            let iIndex = 0
                            if (!mDisplayName) {
                                for (i = 0; i < mainArr.length; i++) {
                                    if (mainArr[i].ClassLink) {
                                        if (mainArr[i].ClassLink == classLink) {
                                            iIndex = i
                                            i = mainArr.length + 1
                                        }
                                    }
                                }
                            } else {
                                for (i = 0; i < mainArr.length; i++) {
                                    if (mainArr[i].DisplayName) {
                                        if (mainArr[i].DisplayName == mDisplayName) {
                                            iIndex = i
                                            i = mainArr.length + 1
                                        }
                                    }
                                }
                            }
                            if (iIndex == 0) {
                                //this thing was not found
                                let newOBJ = {}
                                if (mDisplayName) {
                                    newOBJ.DisplayName = mDisplayName
                                }
                                if (fullImgLink) {
                                    newOBJ.imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                                }
                                if (mIngredients) {
                                    newOBJ.mIngredients = mIngredients
                                }
                                if (classLink) {
                                    newOBJ.ClassLink = classLink
                                }
                                newOBJ.data = [ classData ]
                                mainArr.push(newOBJ)
                            } else {
                                //console.log(mainArr[iIndex])
                                //console.log('DisplayName' in mainArr[i])
                                //if (!('DisplayName' in mainArr[i]) && mDisplayName) {
                                if (!mainArr[iIndex].DisplayName && mDisplayName) {
                                    mainArr[iIndex].DisplayName = mDisplayName
                                }
                                if (!mainArr[iIndex].imgLink && fullImgLink) {
                                    mainArr[iIndex].imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                                }
                                if (!mainArr[iIndex].mIngredients && mIngredients) {
                                    mainArr[iIndex].mIngredients = mIngredients
                                }
                                if (!mainArr[iIndex].ClassLink && classLink) {
                                    mainArr[iIndex].ClassLink = classLink
                                }
                                mainArr[iIndex].data.push( classData)
                            }

                        }
                }

            }

            }
        }
    }

    let descArr = []
    for (let xx = 0; xx < doot.length; xx++) {
        //console.log(doot[xx].Classes.length)
        for (let yy = 0; yy < doot[xx].Classes.length; yy++) {
            //console.log(doot[xx].Classes[yy])
            if (doot[xx].Classes[yy].ClassName.includes('Desc_')) {
                let item = doot[xx].Classes[yy]
                let sObj = {}
                if (item.mDisplayName) {
                    sObj.DisplayName = item.mDisplayName
                }
                if (item.mSmallIcon) {
                    let fullImgLink = item.mSmallIcon
                    sObj.imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                }
                sObj.descLink = item.ClassName
                sObj.descData = item
                descArr.push(sObj)
            }
        }
    }
    let reciArr = []
    for (let xx = 0; xx < doot.length; xx++) {
        //console.log(doot[xx].Classes.length)
        for (let yy = 0; yy < doot[xx].Classes.length; yy++) {
            //console.log(doot[xx].Classes[yy])
            if (doot[xx].Classes[yy].ClassName.includes('Recipe_')) {
                let item = doot[xx].Classes[yy]
                let sObj = {}
                sObj.reciData = item
                reciArr.push(sObj)
            }
        }
    }
    reciArr.forEach(item => {
        if (item.reciData.mProduct) {
            
            let filterItem = item.reciData.mProduct.split('.')[1].split('"\',')[0]
            for (let xx = 0; xx < doot.length; xx++) {
                for (let yy = 0; yy < doot[xx].Classes.length; yy++) {
                    if (doot[xx].Classes[yy].ClassName == filterItem) {
                        item.descData = doot[xx].Classes[yy]
                    }
                }
            }
        }
    })
    reciArr.forEach(item => {
        item.DisplayName = item.reciData.mDisplayName
        if (item.descData) {
            let fullImgLink = item.descData.mSmallIcon
            item.imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
        }
        item.mIngredients = item.reciData.mIngredients
        item.ProducedIn = item.reciData.mProducedIn
    })
    //console.log(reciArr)
    reciSort = reciArr.sort(function(a,b) {
        //sorting by ProducedIn and then DisplayName - only doing the first place it can be built
        if ((a.ProducedIn) && (b.ProducedIn)) {
            if (a.ProducedIn.split('.')[1] > b.ProducedIn.split('.')[1]) return 1
            if (a.ProducedIn.split('.')[1] < b.ProducedIn.split('.')[1]) return -1
        }
        if (a.DisplayName > b.DisplayName) return 1
        if (a.DisplayName < b.DisplayName) return -1
    })

    reciSort.forEach(item => {
        if (item.DisplayName && item.imgLink && item.mIngredients) {
            let itemHolder = document.createElement('div')
            itemHolder.classList.add('item','dFlex')

            let incHolder = document.createElement('div')
            incHolder.classList.add('incrementHolder')

            let minusHolder = document.createElement('div')
            minusHolder.classList.add('minus','noVis')

            let amountHolder = document.createElement('div')
            amountHolder.classList.add('leftSideAmount')

            let plusHolder = document.createElement('div')
            plusHolder.classList.add('plus','clicker')

            let imgTag = document.createElement('img')
            imgTag.classList.add('viewRecip')
            imgTag.src = item.imgLink
            imgTag.loading = 'lazy'
            let titleHolder = document.createElement('h3')
            titleHolder.classList.add('itemName','viewRecip')
            titleHolder.innerText = item.DisplayName

            itemHolder.appendChild(incHolder)
            incHolder.appendChild(minusHolder)
            incHolder.appendChild(amountHolder)
            incHolder.appendChild(plusHolder)

            itemHolder.appendChild(imgTag)
            itemHolder.appendChild(titleHolder)
            document.querySelector('.LeftSide').appendChild(itemHolder)
        }
    })

    document.addEventListener('click', e => {
        if (!document.querySelector('.modalHolder').contains(e.target)) {
            document.querySelector('.modalHolder').innerHTML = ''
        }
        if (e.target.classList.contains('plus') || e.target.classList.contains('minus')) {
            itemClicked(e.target)
        }
        if (e.target.classList.contains('viewRecip')) {
            viewRecip(e.target.parentElement)
        }
    })
    document.querySelector('#nameFilter').addEventListener('keyup', e=> {
        document.querySelectorAll('.item').forEach(item => {
            if (item.querySelector('.itemName').innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                item.classList.remove('noShow')
                item.classList.add('dFlex')
            } else {
                item.classList.add('noShow')
                item.classList.remove('dFlex')
            }
        })
    })
}
function viewRecip(el) {
    if (document.querySelector('.recModal')) {
        document.querySelector('.modalHolder').removeChild(document.querySelector('.recModal'))
    }
    let DisplayName = ''
    let imgLink = ''
    let matArr = []
    el.querySelectorAll('.viewRecip').forEach(item => {    
        switch (item.tagName) {
            case 'IMG':
                imgLink = `img/${item.src.split('img/')[1]}`
                break
            case 'H3':
                DisplayName = item.innerText
                break
        }
        
    }) 
    let iOI = reciSort.filter(item => {return item.DisplayName == DisplayName && item.imgLink == imgLink})
    console.log(iOI)
    iOI[0].mIngredients.split('.').forEach(ing => {

        if (ing.includes('"\',Amount=')) {
            let cNOI = ing.split('"\',Amount=')[0]

            let ingAmount = ing.split('"\',Amount=')[1].split(')')[0]

            let foundItem = reciSort.filter(item => { 
                if (item.descData) {
                    if (item.descData.ClassName === cNOI) {
                        return item
                    }
                }
            })
            let ingName = ''
            let imgLink = ''

            //filter out the alternates for now
    
            if (foundItem.length > 0) {
                if (foundItem.length > 1) {
    
                    let newFI = foundItem.filter(item => { return !(item.DisplayName.includes('Alternate:'))})
                    ingName = newFI[0].DisplayName
                    imgLink = newFI[0].imgLink
                } else {
                    ingName = foundItem[0].DisplayName
                    imgLink = foundItem[0].imgLink
                }
                matArr.push({ "amount":ingAmount, "imgLink": imgLink, "classLink": cNOI, "DisplayName": ingName }) 
            } else {
                console.log(`no recipe found for ${cNOI}`)
            }
        }
    })
    let ProducedIn = iOI[0].ProducedIn
    /*console.log(ProducedIn)
    console.log(ProducedIn.split('/Game/FactoryGame/')[1])*/
    console.log(ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',',''))
    let timmay = ''
    //console.log(doot[30].Classes[5])
    //console.log(doot[30].Classes)
    let xx = ''
    let yy = ''
    for (xx = 0; xx < doot.length; xx++) {
        //console.log(`xx is ${xx}`)
        //console.log(doot[xx].Classes)
        //console.log(doot[xx].Classes.length)
        //console.logI(`yy is ${yy}`)

        for (yy = 0; yy < doot[xx].Classes.length; yy++) {
            //console.log(`yy is ${yy}`)
            //console.log(doot[xx].Classes[yy].ClassName)
            //if (doot[xx].Classes[yy].ClassName === ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')) {
                if (doot[xx].Classes[yy].ClassName == ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')) {
                timmay = doot[xx].Classes[yy]
                yy = doot[xx].Classes.length + 1
                //xx = doot.length + 1
            }
        }
        if (yy > doot[xx].Classes.length) {
            xx = doot.length + 1
        }
    }
    
    
    let recModal = document.createElement('div')
    recModal.classList.add('recModal')
    let recModalTitleHolder = document.createElement('div')
    recModalTitleHolder.classList.add('recModalTitleHolder')
    let recModalHead = document.createElement('div')
    recModalHead.classList.add('recModalHead')
    recModalHead.innerText = 'Recipe:'
    recModalTitleHolder.appendChild(recModalHead)
    let recModalTitle = document.createElement('div')
    recModalTitle.classList.add('recModalTitle')
    recModalTitle.innerText = DisplayName
    recModalTitleHolder.appendChild(recModalTitle)
    recModal.appendChild(recModalTitleHolder)
    //holds the ingredients and amounts
    let recModalData = document.createElement('div')
    recModalData.classList.add('recModalData')
    recModal.appendChild(recModalData)
    let recModalLeft = document.createElement('div')
    recModalLeft.classList.add('recModalLeft')
    matArr.forEach(ing => {
        let ingTile = document.createElement('div')
        ingTile.classList.add('ingTile')
        let ingPic = document.createElement('img')
        ingPic.src = ing.imgLink
        let ingStats = document.createElement('div')
        ingStats.classList.add('ingStats')
        let ingAName = document.createElement('div')
        ingAName.classList.add('ingAName')
        ingAName.innerText = `${ing.amount} ${ing.DisplayName}`
        ingTile.appendChild(ingPic)
        ingTile.appendChild(ingAName) 
        recModalLeft.appendChild(ingTile)
    })
    recModalData.appendChild(recModalLeft)
    let recModalMid = document.createElement('div')
    //this is going to hold info like produced in
    recModalMid.classList.add('recModalMid')
    recModalData.appendChild(recModalMid)
    let builtIn = document.createElement('div')
    builtIn.classList.add('builtIn')
    recModalMid.appendChild(builtIn)
    //console.log(timmay)
    if (timmay.mDisplayName) {
        builtIn.innerText = `Produced: ${timmay.mDisplayName}`
    } else if (ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','') === 'BP_BuildGun_C') {
        builtIn.innerText = 'Produced: Build Gun'
    } else {
        builtIn.innerText = 'Produced: ??'
    }
    if (timmay.mPowerConsumption) {
        let powerConsumption = document.createElement('div')
        powerConsumption.classList.add('powerConsumption')
        powerConsumption.innerText = `${timmay.mPowerConsumption.split('.')[0]} MW`
        recModalMid.appendChild(powerConsumption)
    }
    if (iOI[0].reciData.mManufactoringDuration) {
        let mfTimeHolder = document.createElement('div')
        let mfTime = document.createElement('div')
        mfTime.innerText = `${iOI[0].reciData.mManufactoringDuration.split('.')[0]} second`
        mfTimeHolder.appendChild(mfTime)
        recModalMid.appendChild(mfTimeHolder)
    }
    console.log(iOI[0].reciData.mProduct.split('.'))
    iOI[0].reciData.mProduct.split('.').forEach(item => {
        if (item.includes('"\',Amount=')) {
            let thingy = item.split('"\',Amount=')
            console.log(thingy)
            let thing = reciSort.filter((a) => {
                if (a.descData) {

                    return a.descData.ClassName === thingy[0]
                }
            })
            console.log(thing)
        }

    })
    let recModalRight = document.createElement('div')
    recModalRight.classList.add('recModalRight')
    //reuse ingTile
    let ingTile = document.createElement('div')
    ingTile.classList.add('ingTile')
    let ingPic = document.createElement('img')
    ingPic.src = iOI[0].imgLink
    let ingStats = document.createElement('div')
    ingStats.classList.add('ingStats')
    let ingAName = document.createElement('div')
    ingAName.classList.add('ingAName')
    //need to check where this info is stored
    //ingAName.innerText = `${iOI[0].amount} ${iOI[0].DisplayName}`
    ingAName.innerText = `${iOI[0].DisplayName}`
    ingTile.appendChild(ingPic)
    ingTile.appendChild(ingAName) 
    recModalRight.appendChild(ingTile)
    recModalData.appendChild(recModalRight)
    document.querySelector('.modalHolder').appendChild(recModal)

}
async function getThings(path) {
    let theObject = await fetch(path)
    return theObject.json()
}    
function getUniqueValues(selector,valueOfInterest) {
    let valuesString = '|'
    document.querySelectorAll(selector).forEach(item => {
        if (item.innerText.includes(valueOfInterest)) {
            if (!valuesString.includes(item.innerText)) {
                valuesString = `${valuesString}${item.innerText}|`
            }
        }
    })
    return valuesString.split('|')
}


function addItem(itemName, amount) {
    document.querySelector('.toDoList').innerHTML = document.querySelector('.toDoList').innerHTML + `<div class="addedItem"><div class="aiName">${itemName}</div><div class="aiAmount">${amount}</div></div>`
}
function itemRemove(itemName) {
    document.querySelectorAll('.toDoList .aiName').forEach(item => {
        if (item.innerText == itemName) {
            document.querySelector('.toDoList').removeChild(item.parentElement)
        }
    })

}

function tallyIngredients() {
    let materialList = []
    document.querySelectorAll('.toDoList .addedItem').forEach(item => {
        const itemName = item.querySelector('.aiName').innerText
        
        const itemAmount = Number(item.querySelector('.aiAmount').innerText)
        let itemOfInterest = reciSort.filter(item => {return item.DisplayName == itemName})
        itemOfInterest[0].mIngredients.split('.').forEach(ing => {
            //console.log(ing)
            if (ing.includes('"\',Amount=')) {
                let cNOI = ing.split('"\',Amount=')[0]
                //console.log(cNOI)
                let ingAmount = ing.split('"\',Amount=')[1].split(')')[0]
                //console.log(cNOI)
                let foundItem = reciSort.filter(item => { 
                    if (item.descData) {
                        if (item.descData.ClassName == cNOI) {
                            return item
                        }
                    }
                })
                //console.log(foundItem)
                let ingName = ''
                //filter out the alternates for now

                if (foundItem.length > 0) {
                    if (foundItem.length > 1) {

                        let newFI = foundItem.filter(item => { return !(item.DisplayName.includes('Alternate:'))})
                        ingName = newFI[0].DisplayName
                    } else {
                        ingName = foundItem[0].DisplayName
                    }
                    if (!materialList[ingName]) {
                        materialList[ingName] = ingAmount * itemAmount
                    } else {
                        materialList[ingName] = materialList[ingName] + (ingAmount * itemAmount)
                    }
                } else {
                    console.log(`no recipe found for ${cNOI}`)
                }
            }
        })
    })
    //console.log(materialList)
    let matSort = Object.keys(materialList).sort(function(a,b) {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    })
    //console.log(matSort)
    document.querySelector('.ingTotals').innerHTML = ''
    matSort.forEach(item => {
        //console.log(item)
        let matHolder = document.createElement('div')
        matHolder.classList.add('gFlex')
        let neededMat = document.createElement('div')
        neededMat.classList.add('neededMat')
        //console.log(newThing)
        //console.log(item)
        //if (newThing[item.replace(' ','').replace('.','').replace('™','')].DisplayName) {
            //neededMat.innerText = newThing[item.replace(' ','').replace('.','').replace('™','')].DisplayName
        //} else {
            neededMat.innerText = item
        //}
        let neededAmount = document.createElement('div')
        neededAmount.classList.add('neededAmount')
        neededAmount.innerText = materialList[item]
        matHolder.appendChild(neededMat)
        matHolder.appendChild(neededAmount)
        document.querySelector('.ingTotals').appendChild(matHolder)
        
    })
    /*this here will work
    let totalString = ''
    for (let key in materialList) {
        console.log(`${key}: ${materialList[key]}`)
        if (doot[key][0].ingredients) {
            console.log(doot[key][0].ingredients)
        }
        totalString = totalString + `<div class="gFlex"><div class="neededMat">${key}</div><div class="neededAmount">${materialList[key]}</div></div>`
    }*/
    //document.querySelectorAll('.ingTotals')[0].innerHTML = totalString
}







function itemClicked(elem) {
    let itemAdded = false
    let removeItem = false
    let incEl = elem.closest('.incrementHolder').querySelector('.leftSideAmount')
    
    let amount = ''
    if (elem.classList.contains('plus')) {
        //console.log('adding')
        amount = 1
    } else {
        amount = -1
    }
    let newValue = Number(incEl.innerText) + amount
    //console.log(newValue)
    switch(newValue) {
        case 0:
            //remove the item
            removeItem = true
            //turn off minus sign and the incrementor
            elem.closest('.incrementHolder').querySelectorAll('.plus')[0].classList.remove('turnedOn')
            elem.closest('.incrementHolder').querySelectorAll('.minus')[0].classList.remove('turnedOn','clicker')
            elem.closest('.incrementHolder').querySelectorAll('.minus')[0].classList.add('noVis')
            
            incEl.classList.add('noVis')
            break
        case 1:
            //turn on minus sign and the incrementor
            elem.closest('.incrementHolder').querySelectorAll('.plus')[0].classList.add('turnedOn')
            elem.closest('.incrementHolder').querySelectorAll('.minus')[0].classList.add('turnedOn','clicker')
            elem.closest('.incrementHolder').querySelectorAll('.minus')[0].classList.remove('noVis')
            
            incEl.classList.remove('noVis')
            break
    }
    incEl.innerText = newValue
    //console.log(doot[this.closest('.item').querySelectorAll('.itemName')[0].innerText][0].ingredients)
    //if (document.querySelectorAll(`.toDoList[data-addedIng="${doot[this.closest('item').querySelectorAll('.itemName')[0]}"`).length == 0) {
    //console.log(this.closest('.item').querySelectorAll('itemName')[0].innerText)
    document.querySelectorAll('.toDoList .addedItem .aiName').forEach(item => {
        if (item.innerText == elem.closest('.item').querySelectorAll('.itemName')[0].innerText ) {
            itemAdded = true
            item.closest('.addedItem').querySelectorAll('.aiAmount')[0].innerText = newValue
        }
     })
    if (!itemAdded) {
        //console.log(elem.closest('.item').querySelector('.itemName').innerText)
        addItem(elem.closest('.item').querySelector('.itemName').innerText,newValue)
    }
    if (removeItem) {
        itemRemove(elem.closest('.item').querySelector('.itemName').innerText)
    }
    tallyIngredients()
    
}
/*function ingredientNameClicked() {
    document.querySelectorAll('.LeftSide .item').forEach(item => {
        if (item.querySelectorAll('h3')[0].innerText == this.innerText) {
            console.log(item)
        }
    })

}*/