import React from 'react';


function FooterModal({ isExpanded, collapseFooter }) {

    return (<>

        <footer className={`bg-white font-sans font-light text-gray-800  h-1/2 fixed bottom-0  w-full z-50 rounded-xl `}>
            <button
                onClick={collapseFooter}
                className={`absolute top-0 left-0 mt-4 ml-4  hover:bg-gray-50 text-white  p-2 rounded-full `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="17px" height="17px"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" /></svg>            </button>
            <div className="max-w-7xl mx-16 py-10 px-4 sm:px-6 lg:px-8 relative ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8">
                    <div className='col-span-1'>
                        <h3 className="text-md font-medium text-black mb-4">Assistance</h3>
                        <ul>
                            <li>Centre d'aide</li>
                            <li>Assistance sécurité</li>
                            <li>AirCover</li>
                            <li>Lutte contre la discrimination</li>
                            <li>Assistance handicap</li>
                            <li>Options d'annulation</li>
                            <li>J'ai un problème de voisinage</li>

                        </ul>
                    </div>
                    <div className='col-span-1 mr-6'>
                        <h3 className="text-md font-medium text-black  mb-4">Accueil de voyageurs
                        </h3>
                        <ul>
                            <li>Mettez votre logement sur Airbnb</li>
                            <li>AirCover pour les hôtes</li>
                            <li>Ressources pour les hôtes</li>
                            <li>Forum de la communauté</li>
                            <li>Hébergement responsable</li>
                            <li>Participez à un cours gratuit sur l'accueil de voyageurs</li>
                        </ul>
                    </div>
                    <div className='col-span-1'>
                        <h3 className="text-md font-medium text-black mb-4">Airbnb</h3>
                        <ul className=''>
                            <li>Newsroom</li>
                            <li>Nouvelles fonctionnalités</li>
                            <li>Carrières</li>
                            <li>Investisseurs</li>
                            <li>Cartes cadeaux</li>
                            <li>Séjours d'urgence Airbnb.org</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        {isExpanded && (
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={collapseFooter}
            ></div>
        )}


    </>)
}

export default FooterModal;