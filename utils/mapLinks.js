import Link from 'next/link'

export function mapRelevantLinks(obj){
    return (
        obj.links.map((link, idx) => (
        <a key={idx} href={link.link}>{link.linkName}</a>))
    )
  }

export function mapArtistsLinks(obj){
    return (
        obj.artists.map((artist, idx) => (
        <Link key={idx} href={`/artists/${artist}`}>{artist}</Link>))
    )
}