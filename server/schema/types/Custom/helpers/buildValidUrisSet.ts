import { PrismaContext } from 'server/context/interfaces'
import { ConceptLink } from '../../KBConcept/helpers/validateInternalLinks'
import { getConceptsUrls } from '../../KBConcept/helpers/getConceptsUrls'

export async function buildValidUrisSetCustom(
  ctx: PrismaContext,
): Promise<Set<string>> {
  const concepts: ConceptLink[] = await getConceptsUrls(ctx)

  const conceptsUris = concepts.filter((n) => !!n.uri).map((c) => c.uri)

  return new Set(['/', '/concepts', '/about', ...conceptsUris])
}
