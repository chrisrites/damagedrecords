import Link from 'next/link'

export function mapRelevantLinks(obj){
    return (
        obj.links.map((link, idx) => (
            // Use regular links for external websites
            <a key={idx} href={link.link}>{link.linkName}</a>
        ))
    )
  }

export function mapArtistsLinks(obj){
    return (
        obj.artists.map((artist, idx) => (
            // Use next/link for local paths
            <Link key={idx} href={`/artists/${artist.path}`}>{artist.name}</Link>
        ))
    )
}