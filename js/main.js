let techTier = []
let multProd = []
let hoverObject = ''
const thePath = 'txt/Docs.JSON'
let reciSort = []
let descArr = []
//testing
/*const dig = (obj, target) =>
target in obj
  ? obj[target]
  : Object.values(obj).reduce((acc, val) => {
    //console.log(acc)
      if (acc !== undefined) return acc;
      if (typeof val === 'object') return dig(val, target);
    }, undefined);*/
let doot = {}
let domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
}

domReady(function() {
    main()    
    

})

async function main() {
    doot = await getThings(thePath)
    for (let xx = 0; xx < doot.length; xx++) {
        for (let yy = 0; yy < doot[xx].Classes.length; yy++) {
            //if (doot[xx].Classes[yy].ClassName.toLowerCase().includes('coupon')) {
                //console.log(doot[xx].Classes[yy])
            //}
            if (doot[xx].Classes[yy].ClassName.includes('Desc_') || doot[xx].Classes[yy].ClassName.includes('BP_') || doot[xx].Classes[yy].ClassName.includes('Foundation_') || doot[xx].Classes[yy].ClassName.includes('Build_')) {
                let item = doot[xx].Classes[yy]
                let sObj = {}
                sObj.descData = item
                descArr.push(sObj)
            }
        }
    }
    let uniString = '|'
    let mTechTier = '|'
    
    let mType = '|'
    let reciArr = []
    for (let xx = 0; xx < doot.length; xx++) {
        for (let yy = 0; yy < doot[xx].Classes.length; yy++) {
            if (doot[xx].Classes[yy].ClassName.includes('Recipe_')) {
                let item = doot[xx].Classes[yy]
                let sObj = {}
                sObj.reciData = item
                reciArr.push(sObj)
            }
            //if (doot[xx].Classes[yy].mTechTier) {

                //if (!techTier[doot[xx].Classes[yy].mTechTier]) {
                    //techTier[doot[xx].Classes[yy].mTechTier][0] = doot[xx].Classes[yy]
                //} else {
                    //techTier[doot[xx].Classes[yy].mTechTier].push(doot[xx].Classes[yy])
                //}
            //}
            //console.log(doot[xx].Classes[yy].Tier)
            if (doot[xx].Classes[yy].mTechTier) {

                if (!techTier[doot[xx].Classes[yy].mTechTier]) {
                    techTier[doot[xx].Classes[yy].mTechTier] = []
                }
                let iObj = {}
                //iObj.DisplayName = `${doot[xx].Classes[yy].mTechTier}: ${doot[xx].Classes[yy].mDisplayName}`
                iObj.DisplayName = doot[xx].Classes[yy].mDisplayName
                iObj.fullData = doot[xx].Classes[yy]
                let ings = []
                if (doot[xx].Classes[yy].mCost) {

                    doot[xx].Classes[yy].mCost.split('),(').forEach(thing => {
                    //doot[xx].Classes[yy].mCost.forEach(thing => {
                        let ingObj = {}
                        let classLink = thing.split('"\',Amount=')[0].split('.')[1]
                        ingObj.classLink = classLink
                        ingObj.amount = thing.split('"\',Amount=')[1].replace('))','')
                        ings.push(ingObj)
                    })
                    iObj.ings = ings
                }
                let rewObj = {}
                if (doot[xx].Classes[yy].mUnlocks.length > 0) {
                    
                    doot[xx].Classes[yy].mUnlocks.forEach(unlock => {
                        let rews = []
                        //there are multiple kinds of unlocks up in here - gonna focus on the recipes for now. rewards should probably be an object with all the things for ultimate flexibility...
                        //console.log(unlock)
                        if (unlock.mRecipes) {
                            let recArr = []
                            //console.log(unlock.mRecipes)
                            unlock.mRecipes.split('"\'').forEach(reward => {
                                if (reward.split('.')[1]) {
                                    //console.log(reward.split('.')[1])
                                    recArr.push({"classLink": reward.split('.')[1]})
                                }
                            })
                            rewObj.recipes = recArr
                        }
                        if (unlock.mNumInventorySlotsToUnlock) {
                            rewObj.additionalInventorySlots = unlock.mNumInventorySlotsToUnlock
                        }
                        if (unlock.mResourcesToAddToScanner) {
                            let recArr = []

                            unlock.mResourcesToAddToScanner.split('"\',').forEach(item => {
                                if (item.split('.')[1]) {
                                    recArr.push(item.split('.')[1].replace('"\')',''))
                                }
                            })
                            rewObj.newScannerResources = recArr
                        }
                        if (unlock.mResourcePairsToAddToScanner) {
                            let recArr = []
                            //console.log(unlock.mResourcePairsToAddToScanner)
                            unlock.mResourcePairsToAddToScanner.split('),(').forEach(item => {
                                //console.log(item.split('"\'')[0].split('.')[1])
                                recArr.push(item.split('"\'')[0].split('.')[1])
                            })
                            rewObj.newScannerResourcePairs = recArr
                        }
                        if (unlock.mEmotes) {
                            let recArr = []
                            //console.log(unlock.mEmotes)
                            unlock.mEmotes.split('"\'').forEach(item => {
                                //console.log(item)
                                if (item.split('.')[1]) {
                                    //console.log(item.split('.')[1])
                                    recArr.push(item.split('.')[1])
                                }
                            })
                            rewObj.Emotes = recArr
                        }
                        if (unlock.mSchematics) {
                            let recArr = []
                            //console.log(unlock.mSchematics)
                            unlock.mSchematics.split('"\'').forEach(item => {
                                //console.log(item)
                                //console.log(item.split('.'))
                                if (item.split('.')[1]) {
                                    //console.log(item.split('.')[1])
                                    recArr.push(item.split('.')[1])
                                }
                            })
                            rewObj.schematics = recArr
                        }
                        if (unlock.mNumArmEquipmentSlotsToUnlock) {
                            //console.log(unlock.mNumArmEquipmentSlotsToUnlock)
                            //additionalInventorySlots
                            rewObj.additionalArmSlots = unlock.mNumArmEquipmentSlotsToUnlock
                        }
                        if (unlock.mItemsToGive) {
                            let recObj = {}
                            let sT = unlock.mItemsToGive.split('"\',Amount=')
                            recObj.itemName = sT[0].split('.')[1]
                            recObj.amount = sT[1].replace('))','')
                            rewObj.resourceSinkItems = recObj
                        }

                        iObj.rewards = rewObj
                    })
                    techTier[doot[xx].Classes[yy].mTechTier].push(iObj)
                }
            }
            //var keys = Object.keys(doot[xx].Classes[yy])
            //keys.forEach(function(key) {
                //if (!mTechTier.includes(`|${doot[xx].Classes[yy].mTechTier}|`)) {
                    //console.log(doot[xx].Classes[yy].mTechTier)
                    //mTechTier = mTechTier + doot[xx].Classes[yy].mTechTier + '|'
                //}
                //console.log(key + ": " + doot[xx].Classes[yy][key])
                //console.log(key)
                /*if (!uniString.includes(`|${key}|`)) {
                    console.log(key)
                    uniString = uniString + key + '|'
                }*/
                //if (!mType.includes(`|${doot[xx].Classes[yy].mType}`)) {
                    //console.log(doot[xx].Classes[yy].mType)
                    //mType = mType + doot[xx].Classes[yy].mType + '|'
                //}
            //})
        }
    }
    //add a null entry instead of starting at 0
    let dropdown = document.createElement('select')
    dropdown.classList.add('tier')
    for (let pst = 0; pst < techTier.length; pst++) {
        let option = document.createElement('option')
        option.text = `Tier ${pst}`
        option.value = pst    
        dropdown.appendChild(option)
    }
    document.querySelector('.filters').appendChild(dropdown)
    //console.log(techTier)
    /*techTier.forEach(item => {
        item.forEach(thing => {
            if (thing.mType === 'EST_Milestone') {
                console.log(`Tier: ${thing.mTechTier} - ${thing.mDisplayName}`)
                let recs = thing.mCost.split('),(')
                recs.forEach(ing => {
                    let tt = ing.split('"\',Amount=')
                    //the cost for each milestone tier
                    console.log(`${tt[0].split('.')[1]}: ${tt[1].replace('))','')}`)
                    
                })
            }
        })
    })*/
    //console.log(techTier)
    reciArr.forEach(item => {
        if (item.reciData.mIngredients) {
            item.ings = []
            item.reciData.mIngredients.split('.').forEach(a => {
                if (a.includes('Amount')) {
                    let ingObj = {}
                    let thisThing = descArr.filter(b => { return b.descData.ClassName === a.split('"\',Amount=')[0]})
                    if (thisThing.length > 0) {
                        if (a.split('"\',Amount=')[0].includes('BP_') || a.split('"\',Amount=')[0].includes('Desc_')) {
                            let fullImgLink = thisThing[0].descData.mSmallIcon
                            ingObj.itemName = thisThing[0].descData.mDisplayName
                            ingObj.ClassName = thisThing[0].descData.ClassName
                            //console.log(thisThing)

                            ingObj.imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                            if (thisThing[0].descData.mForm === 'RF_LIQUID') {
                                ingObj.amount = `<span class="amount">${a.split('"\',Amount=')[1].split(')')[0] / 1000} </span><span class="unit">m</span><span class="superscript">3</span>`
                                ingObj.singAm = a.split('"\',Amount=')[1].split(')')[0] / 1000
                            } else {
                                ingObj.amount = `<span class="amount">${a.split('"\',Amount=')[1].split(')')[0]}</span>`
                                ingObj.singAm = a.split('"\',Amount=')[1].split(')')[0]
                            }
                            item.ings.push(ingObj)
                        }
                    } else { 
                        //console.log('no ing found')
                        //console.log(item)
                    }
                }
            })
        }
        if (item.reciData.mProduct) {
            let product = item.reciData.mProduct.split('),')
            item.prods = []
            if (product.length > 0) {
                product.forEach(pI => {
                    let thisThing = descArr.filter(a => { return a.descData.ClassName === pI.split('.')[1].split('"\',')[0]})
                    if (thisThing.length > 0) {

                        let prodObj = {}
                        if (thisThing[0].descData.mDisplayName) {

                            prodObj.itemName = thisThing[0].descData.mDisplayName
                        } else {
                            prodObj.itemName = item.reciData.mDisplayName
                        }
                        let fullImgLink = thisThing[0].descData.mSmallIcon
                        prodObj.imgLink = `img/${fullImgLink.substring(fullImgLink.indexOf('/') + 1, fullImgLink.length).split('.')[0]}.png`
                        prodObj.ClassName = pI.split('.')[1].split('"\',')[0]
                        if (thisThing[0].descData.mForm === 'RF_LIQUID') {
                            prodObj.amount = `<span class="amount">${pI.split('Amount=')[1].replace('))','') / 1000} </span><span class="unit">m</span><span class="superscript">3</span>`
                            prodObj.singAm = pI.split('Amount=')[1].replace('))','') / 1000
                        } else {
                            prodObj.amount = `<span class="amount">${pI.split('Amount=')[1].replace('))','')}</span>`
                            prodObj.singAm = pI.split('Amount=')[1].replace('))','') 
                        }
                        /*if (thisThing[0].descData.mForm === 'RF_LIQUID') {
                            prodObj.unit = '<span class="unit">M</span><span class="superscript">3</span>'
                        }*/

                        item.prods.push(prodObj)
                    } else {
                        console.log('no match found')
                    }
                })
            }
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
        /*let producedIn = ''
        if (!item.reciData.mProducedIn || item.reciData.mProducedIn === '(/Script/FactoryGame.FGBuildGun)') {
            producedIn = '??'
        } else {
            producedIn = item.reciData.mProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')
        }*/
        //item.ProducedIn = producedIn
        item.ProducedIn = item.reciData.mProducedIn
        //let iOI = descArr.filter(a => {return a.ClassName === item.ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')})
        //console.log(item.reciData.mProducedIn)
        //let iOI = descArr.filter(a => {return a.descData.ClassName === producedIn})
        //console.log(iOI)
        //console.log(item)
    })
    //console.log(descArr)
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
        if (!(item.DisplayName == undefined) && !(item.imgLink == undefined) && !(item.mIngredients == undefined)) {
        //if (item.DisplayName && item.imgLink && item.mIngredients) {
            let itemHolder = document.createElement('div')
            itemHolder.classList.add('item','dFlex',item.reciData.ClassName)

            let incHolder = document.createElement('div')
            incHolder.classList.add('incrementHolder')

            let minusHolder = document.createElement('div')
            minusHolder.classList.add('minus','noVis')

            let amountHolder = document.createElement('div')
            amountHolder.classList.add('leftSideAmount')

            let plusHolder = document.createElement('div')
            plusHolder.classList.add('plus','clicker')
            
            let imgHolder = document.createElement('div')
            let titleHolder = document.createElement('h3')
            titleHolder.classList.add('itemName','viewRecip')
            //titleHolder.innerText = item.DisplayName
            let pCount = 0
            item.prods.forEach(prod => {
                //console.log(prod)
                let imgTag = document.createElement('img')
                imgTag.classList.add('viewRecip')
                imgTag.src = prod.imgLink
                imgTag.loading = 'lazy'
                if (pCount === 0) {
                    if (item.DisplayName !== prod.itemName) {
                        titleHolder.innerText = `${item.DisplayName} (${prod.itemName}`
                    } else {

                        titleHolder.innerText = `${prod.itemName}`
                    }
                    //console.log(prod.itemName)
                    pCount++
                } else {
                    titleHolder.innerText = titleHolder.innerText + ` / ${prod.itemName}`
                }
                
                imgHolder.appendChild(imgTag)
            })
            if (titleHolder.innerText.includes('(')) {

                titleHolder.innerText = titleHolder.innerText + ')'
            }
            itemHolder.appendChild(incHolder)
            incHolder.appendChild(minusHolder)
            incHolder.appendChild(amountHolder)
            incHolder.appendChild(plusHolder)

            //itemHolder.appendChild(imgTag)
            itemHolder.appendChild(imgHolder)
            itemHolder.appendChild(titleHolder)
            document.querySelector('.LeftSide').appendChild(itemHolder)
        }
    })
    
    //console.log(reciArr)
    techTier.forEach(items => {
        //console.log(items)
        items.forEach(item => {
            //console.log(item)
            if (item.ings) {
                item.ings.forEach(ing => {
                    //console.log(ing)
                    let findThing = reciArr.filter(a => {
                        if (a.descData) {
                            return a.descData.ClassName === ing.classLink
                        } 
                    })
                    //console.log(descArr)
                    let newThing = []
                    switch (findThing.length) {
                        case 0:
                            //fall back on descArr
                            newThing = descArr.filter(a => {
                                return a.descData.ClassName === ing.classLink
                            })
                            switch (newThing.length) {
                                case 0:
                                    switch (ing.classLink) {
                                        case 'Desc_HardDrive_C':
                                            ing.itemName = 'Hard Drive'
                                            ing.imgLink = 'img/Game/FactoryGame/Resource/Environment/CrashSites/UI/HardDrive_64.png'
                                            break
                                        case 'Desc_ResourceSinkCoupon_C':
                                            ing.itemName = 'FICSIT Coupon'
                                            ing.imgLink = 'img/None.png'
                                            break
                                        default:
                                            console.log(ing.classLink)
                                            break
                                    }

                                    //console.log(ing.classLink)
                                    break
                                case 1:
                                    if (!newThing[0].descData.mDisplayName || !newThing[0].descData.mSmallIcon) {
                                        //so far, no issues
                                        console.log(newThing[0])
                                    } else {
                                        ing.itemName = newThing[0].descData.mDisplayName
                                        ing.imgLink = `img/${newThing[0].descData.mSmallIcon.substring(newThing[0].descData.mSmallIcon.indexOf('/') + 1, newThing[0].descData.mSmallIcon.length).split('.')[0]}.png`
                                    }
                                    break
                                default:
                                    console.log('filter thingy has more objects than expected - potentially filter by "alternate" on ClassName"')
                                    break
                            }
                            break
                        case 1:
                            ing.itemName = findThing[0].DisplayName
                            ing.imgLink = findThing[0].imgLink
                            break
                        default:
                            //filter out the alternates
                            newThing = findThing.filter(a => {
                                return !a.DisplayName.includes('Alternate')
                            })
                            ing.itemName = newThing[0].DisplayName
                            ing.imgLink = newThing[0].imgLink
                    }
                    /*if (findThing.length === 0) {
                        console.log(ing)
                    }*/
                })
            }
            if (item.rewards.recipes) {
                //console.log(item.rewards.recipes)
                item.rewards.recipes.forEach(rec => {
                    //console.log(rec.classLink)
                    let foundItem = reciArr.filter(a => {
                        return a.reciData.ClassName === rec.classLink
                    })
                    rec.itemName = foundItem[0].DisplayName
                    rec.imgLink = foundItem[0].imgLink
                })
            }
        })
    })

    document.addEventListener('change', e => {
        if (e.target.classList.contains('tier')) {
            //console.log(e.target.value)
            tierChange(e.target.value)
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
        if (e.target.classList.contains('viewIng')) {
            viewIng(e.target)
        }
        if (e.target.classList.contains('fullReport')) {
            //console.log(e.target)
            fullReport(e.target.closest('.addedItem'))
        }
        //console.log(e.target)
        if (e.target.classList.contains('tierItem')) {
            clickedTierItem(e.target.innerText)
            //console.log(e.target)
        }
        //console.log(e.target)
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
    //console.log(techTier)
}
function tierChange(tier) {
    //console.log(tier)
    //-1
    //document.querySelectorAll('.tierToggle').forEach(item => {
        //item.removeEventListener('')
    //})
    //1
    if (document.querySelector('.tierToggleHolder')) {
        let holder = document.querySelector('.tierToggleHolder')
        holder.parentNode.removeChild(holder)
    }
    //2 create a holder
    let holder = document.createElement('div')
    holder.classList.add('tierToggleHolder')
    //console.log(document.querySelector('.filters'))
    document.querySelector('.filters').appendChild(holder)
    //3 get the selected tier and add in the data
    techTier[tier].forEach(item => {
        //console.log(item)
        //console.log(item.)
        if (item.fullData.mType === 'EST_Milestone') {
            //console.log(item)
            let rHolder = document.createElement('div')
            //rHolder.classList.add('tierItem')
            let rHolderTitle = document.createElement('span')
            rHolderTitle.classList.add('tierItem')
            rHolderTitle.innerText = item.DisplayName
            rHolder.appendChild(rHolderTitle)
            holder.appendChild(rHolder)
            //console.log(item.DisplayName)
        }
    })
    //4 set up event triggers
    //document.querySelectorAll('.tierItem').forEach(item => {
    //    item.addEventListener('click',)
    //})
    //-1. remove existing event triggers?
    //1. set inner html of existing thingy to ''
    //2. loop through selected tiers and provide some kind of interactivity for each description - buttons? checkboxs?
    //3. assi?
}
function clickedTierItem(tierTitle) {
    console.log(tierTitle)
    let sI = techTier[document.querySelector('.tier').value].filter(item => {
        return item.DisplayName === tierTitle
    })
    //console.log('rewards:')
    //console.log(sI[0].rewards)
    //console.log('cost:')
    //console.log(sI[0].ings)
    //console.log(sI)
    if (document.querySelector('.recModal')) {
        document.querySelector('.recModal').parentNode.removeChild(document.querySelector('.recModal'))
    }
    let recModal = document.createElement('div')
    recModal.classList.add('recModal')
    let recModalTitleHolder = document.createElement('div')
    recModalTitleHolder.classList.add('recModalTitleHolder')
    let recModalHead = document.createElement('div')
    recModalHead.classList.add('recModalHead')
    console.log(sI[0])
    //recModalHead.innerText = 'Tier View:'
    recModalHead.innerText = `Tier ${sI[0].fullData.mTechTier}:`
    recModalTitleHolder.appendChild(recModalHead)
    let recModalTitle = document.createElement('div')
    recModalTitle.classList.add('recModalTitle')
    recModalTitle.innerText = sI[0].DisplayName
    recModalTitleHolder.appendChild(recModalTitle)
    recModal.appendChild(recModalTitleHolder)
    
    let recModalMid = document.createElement('div')
    //this is going to hold info tbd
    recModalMid.classList.add('recModalMid')
    let recModalData = document.createElement('div')
    recModalData.appendChild(recModalMid)
    let recModalLeft = document.createElement('div')
    recModalLeft.classList.add('recModalLeft')
    //holds the ingredients and amounts
    
    recModalData.classList.add('recModalData')
    recModal.appendChild(recModalData)
    
    recModalData.appendChild(recModalLeft)
    let recModalLeftTitle = document.createElement('div')
    recModalLeftTitle.classList.add('recModalLeftTitle')
    let recModalLeftTitleHolder = document.createElement('span')
    recModalLeftTitleHolder.innerText = 'Cost:'
    recModalLeftTitle.appendChild(recModalLeftTitleHolder)
    recModalLeft.appendChild(recModalLeftTitle)
    let cost = document.createElement('div')
    cost.classList.add('cost')
    let tCount = 1
    sI[0].ings.forEach(ing => {
        let ingTile = document.createElement('a')
        ingTile.classList.add('ingTile',ing.classLink, 'viewIng')
        ingTile.href = `#ing${tCount}`
        ingTile.id = `ing${tCount}`
        tCount++
        let ingDataHolder = document.createElement('div')
        ingDataHolder.classList.add('ingDataHolder')
        let ingPic = document.createElement('img')
        ingPic.src = ing.imgLink
        ingPic.classList.add('viewIng')
        let ingStats = document.createElement('div')
        ingStats.classList.add('ingStats','viewIng')
        let ingAName = document.createElement('div')
        ingAName.classList.add('ingAName','viewIng')
        ingAName.innerHTML = `${ing.amount} ${ing.itemName}`
        /*let ingPerSec = document.createElement('div')
        ingPerSec.classList.add('perSecond')
        ingPerSec.innerHTML = `(${(item.singAm / pDur) * 60} / minute)`*/
        //testing for accordion
        //let alts = document.createElement('ul')
        //alts.id = `ing${tCount}`
        //tCount++
        /*alts.classList.add('alts')
        let altMat = reciSort.filter(a => {
            if (a.descData) {
                return a.descData.ClassName === ing.classLink
            }
        }).sort(function(a,b) {
            if (a.DisplayName > b.DisplayName) {
                return 1    
            }
            if (a.DisplayName < b.DisplayName) {
                return -1
            }
        })
        altMat.forEach(tt => {
            let teps = reciSort.filter(z => { return z.DisplayName === tt.DisplayName})
            //console.log(teps[0])
            //console.log(tt)
            /*mFDur = tt.reciData.mManufactoringDuration.split('.')[0]
            mFAmount = (tt.prods.filter(z => { return z.ClassName === tt.descData.ClassName})[0].singAm / mFDur) * 60*/
            //console.log(mFAmount)
            //let producer = teps[0].ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')
            //let equip = descArr.filter(z => { return z.descData.ClassName === producer})
            //console.log(producer)
            //console.log(equip)*/
            /*let newLI = document.createElement('li')
            newLI.innerText = `${tt.DisplayName} (${mFAmount} / minute)`
            alts.appendChild(newLI)
        })*/
        //console.log(altMat)
        //onsole.log(altMat)

        ingDataHolder.appendChild(ingPic)
        ingDataHolder.appendChild(ingAName) 
        //ingDataHolder.appendChild(ingPerSec)
        ingTile.appendChild(ingDataHolder)
        /*ingTile.appendChild(alts)*/
        recModalLeft.appendChild(ingTile)
        
        /*let whatIs = descArr.descData.filter(a => {
            return a.ClassName === ing.DisplayName
        })*/
        //console.log(whatIs)
    })
    //console.log(sI[0])
    let recModalRight = document.createElement('div')
    recModalRight.classList.add('recModalRight')
    let recModalRightTitleHolder = document.createElement('div')
    recModalRightTitleHolder.classList.add('recModalRightTitleHolder')
    let recModalRightTitle = document.createElement('span')
    recModalRightTitle.classList.add('recRightModalTitle')
    recModalRightTitle.innerText = 'Rewards:'
    recModalRightTitleHolder.appendChild(recModalRightTitle)
    recModalRight.appendChild(recModalRightTitleHolder)
    recModalData.appendChild(recModalRight)
    sI[0].rewards.recipes.forEach(ing => {
        let ingTile = document.createElement('div')
        ingTile.classList.add('ingTile',ing.classLink, 'viewIng')
        let ingDataHolder = document.createElement('div')
        ingDataHolder.classList.add('ingDataHolder')
        let ingPic = document.createElement('img')
        ingPic.src = ing.imgLink
        ingPic.classList.add('viewIng')
        let ingStats = document.createElement('div')
        ingStats.classList.add('ingStats','viewIng')
        let ingAName = document.createElement('div')
        ingAName.classList.add('ingAName','viewIng')
        ingAName.innerHTML = ing.itemName
        ingDataHolder.appendChild(ingPic)
        ingDataHolder.appendChild(ingAName)
        ingTile.appendChild(ingDataHolder)
        recModalRight.appendChild(ingTile)
    })
    document.querySelector('.modalHolder').appendChild(recModal)
}
function fullReport(el) {
    console.log(el)
    let recip = reciSort.filter(a => {return a.DisplayName === el.querySelector('.aiName').innerText})
    console.log(recip)
}
function viewIng(el) {
    //console.log(el)
    let classNameValue = undefined
    el.closest('.ingTile').classList.forEach(a => {
        if (a.includes('Desc_')) {
            classNameValue = a
        }
    })
    /*if (el.closest('.ingTile').querySelector('.alts').classList.contains('collapsed')) {
        //remove collapsed, add expanded
        el.closest('.ingTile').querySelector('.alts').classList.remove('collapsed')
        el.closest('.ingTile').querySelector('.alts').classList.add('expanded')
    } else {
        //remove expanded, add collapsed
        el.closest('.ingTile').querySelector('.alts').classList.remove('expanded')
        el.closest('.ingTile').querySelector('.alts').classList.add('collapsed')
    }*/
    
}
function viewRecip(el) {
    if (document.querySelector('.recModal')) {
        document.querySelector('.modalHolder').removeChild(document.querySelector('.recModal'))
    }
    let DisplayName = ''
    let imgLink = ''
    let matArr = []

    let classNameValue = undefined
    el.closest('.item').classList.forEach(a => {
        if (a.includes('Recipe_')) {
            classNameValue = a
        }
    })
    //console.log(classNameValue)
    //console.log(el.closest('.item').classList.filter(a => {return a.includes('Recipe_') }))
    let iOI = reciSort.filter(item => {return item.reciData.ClassName === classNameValue})
    //console.log(iOI)
    iOI[0].mIngredients.split('.').forEach(ing => {

        if (ing.includes('"\',Amount=')) {
            let cNOI = ing.split('"\',Amount=')[0]
            //console.log(cNOI)
            let ingAmount = ing.split('"\',Amount=')[1].split(')')[0]

            let foundItem = reciSort.filter(item => { 
                if (item.descData) {
                    if (item.descData.ClassName === cNOI) {
                        return item
                    }
                }
            })
            //console.log(foundItem)
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
    
    //console.log(ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',',''))
    let timmay = ''

    let xx = ''
    let yy = ''
    for (xx = 0; xx < doot.length; xx++) {

        for (yy = 0; yy < doot[xx].Classes.length; yy++) {
                if (doot[xx].Classes[yy].ClassName == ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')) {
                timmay = doot[xx].Classes[yy]
                yy = doot[xx].Classes.length + 1
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
    recModalTitle.innerText = iOI[0].DisplayName
    recModalTitleHolder.appendChild(recModalTitle)
    recModal.appendChild(recModalTitleHolder)
    
    let recModalMid = document.createElement('div')
    //this is going to hold info like produced in
    recModalMid.classList.add('recModalMid')
    let recModalData = document.createElement('div')
    recModalData.appendChild(recModalMid)
    let builtIn = document.createElement('div')
    builtIn.classList.add('builtIn')
    recModalMid.appendChild(builtIn)
    if (timmay.mDisplayName) {
        builtIn.innerText = `Produced by: ${timmay.mDisplayName}`
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
    let pDur = ''
    if (iOI[0].reciData.mManufactoringDuration) {
        pDur = iOI[0].reciData.mManufactoringDuration.split('.')[0]
        let mfTimeHolder = document.createElement('div')
        let mfTime = document.createElement('div')
        mfTime.innerText = `${pDur} second`
        mfTimeHolder.appendChild(mfTime)
        recModalMid.appendChild(mfTimeHolder)
    }





    
    let recModalLeft = document.createElement('div')
    recModalLeft.classList.add('recModalLeft')
    //holds the ingredients and amounts
    
    recModalData.classList.add('recModalData')
    recModal.appendChild(recModalData)
    
    recModalData.appendChild(recModalLeft)
    
    
    
    
    let tCount = 1
    iOI[0].ings.forEach(item => {
        //console.log(item)
        //let ingTile = document.createElement('div')
        let ingTile = document.createElement('a')
        ingTile.classList.add('ingTile',item.ClassName, 'viewIng')
        ingTile.href = `#ing${tCount}`
        ingTile.id = `ing${tCount}`
        tCount++
        let ingDataHolder = document.createElement('div')
        ingDataHolder.classList.add('ingDataHolder')
        let ingPic = document.createElement('img')
        ingPic.src = item.imgLink
        ingPic.classList.add('viewIng')
        let ingStats = document.createElement('div')
        ingStats.classList.add('ingStats','viewIng')
        let ingAName = document.createElement('div')
        ingAName.classList.add('ingAName','viewIng')
        ingAName.innerHTML = `${item.amount} ${item.itemName}`
        let ingPerSec = document.createElement('div')
        ingPerSec.classList.add('perSecond')
        ingPerSec.innerHTML = `(${(item.singAm / pDur) * 60} / minute)`
        //testing for accordion
        let alts = document.createElement('ul')
        //alts.id = `ing${tCount}`
        //tCount++
        alts.classList.add('alts')
        let altMat = reciSort.filter(a => {
            if (a.descData) {
                return a.descData.ClassName === item.ClassName
            }
        }).sort(function(a,b) {
            if (a.DisplayName > b.DisplayName) {
                return 1    
            }
            if (a.DisplayName < b.DisplayName) {
                return -1
            }
        })
        altMat.forEach(tt => {
            let teps = reciSort.filter(z => { return z.DisplayName === tt.DisplayName})
            //console.log(teps[0])
            //console.log(tt)
            mFDur = tt.reciData.mManufactoringDuration.split('.')[0]
            mFAmount = (tt.prods.filter(z => { return z.ClassName === tt.descData.ClassName})[0].singAm / mFDur) * 60
            //console.log(mFAmount)
            //let producer = teps[0].ProducedIn.split('/Game/FactoryGame/')[1].split('.')[1].replace(')','').replace(',','')
            //let equip = descArr.filter(z => { return z.descData.ClassName === producer})
            //console.log(producer)
            //console.log(equip)
            let newLI = document.createElement('li')
            newLI.innerText = `${tt.DisplayName} (${mFAmount} / minute)`
            alts.appendChild(newLI)
        })
        //console.log(altMat)
        //onsole.log(altMat)

        ingDataHolder.appendChild(ingPic)
        ingDataHolder.appendChild(ingAName) 
        ingDataHolder.appendChild(ingPerSec)
        ingTile.appendChild(ingDataHolder)
        ingTile.appendChild(alts)
        recModalLeft.appendChild(ingTile)
    })


    
    //console.log(iOI[0].reciData.mProduct.split('.'))
    /*iOI[0].reciData.mProduct.split('.').forEach(item => {
        if (item.includes('"\',Amount=')) {
            let thingy = item.split('"\',Amount=')
            console.log(thingy)
            let thing = reciSort.filter((a) => {
                if (a.descData) {

                    return a.descData.ClassName === thingy[0]
                }
            })
            //console.log(thing)
        }

    })*/
    let recModalRight = document.createElement('div')
    recModalRight.classList.add('recModalRight')
    //reuse ingTile
    iOI[0].prods.forEach(item => {
        let ingTile = document.createElement('div')
        ingTile.classList.add('ingTile')
        let ingPic = document.createElement('img')
        ingPic.src = item.imgLink
        let ingStats = document.createElement('div')
        ingStats.classList.add('ingStats')
        let ingAName = document.createElement('div')
        ingAName.classList.add('ingAName')
        //need to check where this info is stored
        //ingAName.innerText = `${iOI[0].amount} ${iOI[0].DisplayName}`
        ingAName.innerHTML = `${item.amount} ${item.itemName}`
        let ingPerSec = document.createElement('div')
        ingPerSec.classList.add('perSecond')
        ingPerSec.innerHTML = `(${(item.singAm / pDur) * 60} / minute)`
        ingTile.appendChild(ingPic)
        ingTile.appendChild(ingAName)     
        ingTile.appendChild(ingPerSec)
        recModalRight.appendChild(ingTile)
    })
    
    
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


function addItem(itemName, amount, rName) {
    let newAdd = document.createElement('div')
    newAdd.classList.add('addedItem','fullReport',rName)
    let nameHolder = document.createElement('div')
    nameHolder.classList.add('aiName','fullReport')
    nameHolder.innerText = itemName
    newAdd.appendChild(nameHolder)
    let amountHolder = document.createElement('div')
    amountHolder.classList.add('aiAmount','fullReport')
    amountHolder.innerText = amount
    newAdd.appendChild(amountHolder)
    document.querySelector('.toDoList').appendChild(newAdd)
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
    let testList = []
    document.querySelectorAll('.toDoList .addedItem').forEach(item => {
        //const itemName = item.querySelector('.aiName').innerText
        //console.log(item)
        let rName = ''
        item.classList.forEach(a => {
            if (a.includes('Recipe_')) {
                rName = a
            }
        })

        //let testList = []
        const itemAmount = Number(item.querySelector('.aiAmount').innerText)
        //let itemOfInterest = reciSort.filter(item => {return item.DisplayName == itemName})
        itemOfInterest = reciSort.filter(item => {return item.reciData.ClassName === rName})
        //console.log(itemOfInterest)
        itemOfInterest[0].mIngredients.split('.').forEach(ing => {
            //console.log(ing)
            if (ing.includes('"\',Amount=')) {
                let cNOI = ing.split('"\',Amount=')[0]
                //console.log(cNOI)
                let ingAmount = ing.split('"\',Amount=')[1].split(')')[0]
                //console.log(cNOI)
                let foundItem = reciSort.filter(item => { 
                    if (item.descData) {
                        if (item.descData.ClassName == cNOI && !(item.DisplayName.includes('Alternate:'))) {
                            return item
                        }
                    }
                })
                //console.log(foundItem)
                let ingName = ''
                //filter out the alternates for now
                let theIndex = 0
                if (foundItem.length > 0) {
                    for (let vv = 0; vv < testList.length; vv++) {
                        if (testList[vv].ingName === foundItem[0].DisplayName) {
                            theIndex = vv
                            vv = testList.length + 1
                        }
                    }
                    if (theIndex === 0) {
                    //if (!testList[cNOI]) {
                        //need a new object
                        let newObj = {}
                        newObj.ingName = foundItem[0].DisplayName
                        newObj.ingAmount = ingAmount * itemAmount
                        newObj.ClassName = cNOI
                        testList.push(newObj) 
                    } else {
                        //update the object
                        testList[theIndex].ingAmount = testList[theIndex].ingAmount + (ingAmount * itemAmount)
                    }
                    ingName = foundItem[0].DisplayName
                    /*if (foundItem.length > 1) {

                        let newFI = foundItem.filter(item => { return !(item.DisplayName.includes('Alternate:'))})
                        ingName = newFI[0].DisplayName
                    } else {
                        ingName = foundItem[0].DisplayName
                    }*/
                    if (!materialList[ingName]) {
                        materialList[ingName] = ingAmount * itemAmount
                    } else {
                        materialList[ingName] = materialList[ingName] + (ingAmount * itemAmount)
                    }
                    //console.log(testList)
                } else {
                    console.log(`no recipe found for ${cNOI}`)
                }
            }
        })
    })
    let matSort = Object.keys(materialList).sort(function(a,b) {
        if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }
        return 0
    })
    //let testSort = Object.keys(testList).sort(function(a,b) {
    let testSort = testList.sort(function(a,b) {
        if (a.ingName > b.ingName) {
            return 1
        }
        if (a.ingName < b.ingName) {
            return -1
        }
        /*if (a > b) {
            return 1
        }
        if (a < b) {
            return -1
        }*/
        return 0
    })
    //console.log(matSort)
    //console.log(testList)
    console.log(testSort)
    document.querySelector('.ingTotals').innerHTML = ''
    testSort.forEach(item => {
        let matHolder = document.createElement('div')
        matHolder.classList.add('gFlex',item.ClassName)
        let neededMat = document.createElement('div')
        neededMat.classList.add('neededMat')
        neededMat.innerText = item.ingName
        let neededAmount = document.createElement('div')
        neededAmount.classList.add('neededAmount')
        neededAmount.innerText = item.ingAmount
        matHolder.appendChild(neededMat)
        matHolder.appendChild(neededAmount)
        document.querySelector('.ingTotals').appendChild(matHolder)
    })
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
    document.querySelectorAll('.toDoList .addedItem .aiName').forEach(item => {
        if (item.innerText == elem.closest('.item').querySelectorAll('.itemName')[0].innerText ) {
            itemAdded = true
            item.closest('.addedItem').querySelectorAll('.aiAmount')[0].innerText = newValue
        }
    })
    if (!itemAdded) {
        let rName = ''
        elem.closest('.item').classList.forEach(a => {
            if (a.includes('Recipe_')) { 
                rName = a
            }
        })
        addItem(elem.closest('.item').querySelector('.itemName').innerText,newValue,rName)
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