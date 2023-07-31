import './Breadcrumbs.css'

export default function Breadcrumbs ({items}) {

  return (
    <nav className='Breadcrumbs '>
      <ul>
        {items.map((item, index) => (
          (items.length !== (index+1))?
          <li key={index}>
            <a href={item.link}>{item.label}</a> &gt;
          </li>
          :
          <li key={index}>
            <a href={item.link}>{item.label}</a> 
          </li>
        ))}
      </ul>
    </nav>
  )
}