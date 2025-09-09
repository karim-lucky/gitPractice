 



interface feature  {
    title:string,
    description:string
}

interface featureCardProps  {
    feature:feature []
}

export default function FeatureDetail({feature}:featureCardProps ){

    // console.log(title,description)
    console.log(feature)
  



    return <div className="p-6 rounded-xl shadow bg-white">
      {/* <img src={image} alt={title} className="w-20 h-20 mb-4" /> */}
      {/* <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p> */}
      {
        feature.map((feature)=>{
            return <div>
                    <h1 className="text-lg font-semibold">{feature.title}</h1>
                    {/* <p>  className="text-gray-600"{feature.description}</p> */}
                    <p className="text-gray-500">  {feature.description}</p>
                </div>
        })
      }
    </div>
}